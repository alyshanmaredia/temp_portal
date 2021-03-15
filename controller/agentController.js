const send_mail = require("../controller/mailController");
const oBcrypt = require("bcrypt");
const oWebToken = require("jsonwebtoken");
const Agents = require("../model/agentSchema");

const { UI_URL } = process.env;

module.exports = agentController = {
  signUp: async (req, res) => {
    try {
      const { username, emailAddress, password } = req.body;
      if (!emailAddress || !password || !username) {
        return res.status(400).json({ msg: "Please fill all fields" });
      }
      if (!emailValidation(emailAddress)) {
        return res.status(400).json({ msg: "Email Is not Valid!" });
      }

      const agent = await Agents.findOne({ emailAddress });
      if (agent) {
        return res
          .status(400)
          .json({ msg: "This Email is already has been Registered!" });
      }
      if (password.length < 8) {
        return res
          .status(400)
          .json({ msg: "Password Length should be 8 or greater!" });
      }
      const passHash = await oBcrypt.hash(password, 16);

      const modified_agent_data = {
        username,
        emailAddress,
        password: passHash,
      };

      const tokenActive = generate_Active(modified_agent_data);

      const concat_url = `${UI_URL}/agent/account_activation/${tokenActive}`;

      send_mail(emailAddress, concat_url, "Verify Mail");
      console.log(tokenActive);
      res.json({ msg: "Signup has been completed, activate your email" });
    } catch (err) {
      return res.status(500).json({ msg: "Error Occured While Signing Up" });
    }
  },
  mailActivation: async (req, res) => {
    try {
      const { tokenActive } = req.body;
      const agent = oWebToken.verify(tokenActive, process.env.TOKEN_ACTIVATE);

      console.log(agent);
      const { username, emailAddress, password } = agent;
      const mailCheck = await Agents.findOne({ emailAddress });
      if (mailCheck) {
        return res
          .status(400)
          .json({ msg: "This email address is already registered" });
      }

      const newAgent = new Agents({
        username,
        emailAddress,
        password,
      });

      await newAgent.save();

      res.json({ msg: "Your account is activated now" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  signIn: async (req, res) => {
    try {
      const { emailAddress, password } = req.body;
      const agent = await Agents.findOne({ emailAddress });
      if (!agent) {
        return res.status(400).json({ msg: "This email is not registered!" });
      }
      const isEqual = await oBcrypt.compare(password, agent.password);
      if (!isEqual) {
        return res.status(400).json({ msg: "The password is Incorrect!" });
      }
      const refreshToken = generate_Refresh({ id: agent._id });
      res.cookie("token_rf", refreshToken, {
        path: "/agent/refresh_token",
        httpOnly: true,
        maxAge: 259200000, // token valid for 3day
      });
      res.json({ msg: "Login Successfull!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  accessToken: (req, res) => {
    try {
      const rfToken = req.cookies.token_rf;
      if (!rfToken) return res.status(400).json({ msg: "Please login!" });

      oWebToken.verify(rfToken, process.env.TOKEN_REFRESH, (err, agent) => {
        if (err) return res.status(400).json({ msg: "Please login!" });

        const ac_token = generate_Acess({ id: agent.id });
        res.json({ ac_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  passwordForgot: async (req, res) => {
    try {
      const { emailAddress } = req.body;
      
      const agent = await Agents.findOne({ emailAddress });
      if (!agent) {
        return res.status(400).json({ msg: "Email Address Does Not Exists!!" });
      }

      const token_ac = generate_Acess({ id: agent._id });
      const urlAddress = `${UI_URL}/agent/reset_password/${token_ac}`;

      send_mail(emailAddress, urlAddress, "Please Reset Your password");
      res.json({ msg: "Email is send for Password Reset" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  passwordReset: async (req, res) => {
    try {
      const password = req.body.password;
      const passHash = await oBcrypt.hash(password, 16);
      console.log(req.agent);
      await Agents.findByIdAndUpdate(
        { _id: req.agent.id },
        {
          password: passHash,
        }
      );

      res.json({ msg: "Your Password has been Changed!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  AgentInfo: async (req, res) => {
    try {
      const agent = await Agents.findById(req.agent.id).select("-password");
      res.json(agent);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  AllAgentInfo: async (req, res) => {
    try {
      const agents = await Agents.find().select("-password");
      res.json(agents);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  signOut: async (req, res) => {
    try {
      res.clearCookie("token_rf", { path: "/agent/refresh_token" });
      return res.json({ msg: "Successfully Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  editInfo: async (req, res) => {
    try {
      const { displayImage, username } = req.body;
      await Agents.findByIdAndUpdate(
        { _id: req.agent.id },
        {
          displayImage,
          username,
        }
      );
      res.json({ msg: "Updated the Data Successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  makeAdmin: async (req, res) => {
    try {
      const { isAdmin } = req.body;
      await Agents.findByIdAndUpdate(
        { _id: req.params.id },
        {
          isAdmin,
        }
      );
      res.json({ msg: "Agent has become Admin Successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  removeAgent: async (req, res) => {
    try {
      await Agents.findByIdAndDelete(req.params.id);
      res.json({ msg: "Agent removed Successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

//functions to generate 3 types of different tokens with their expiry time passed as parameter
function generate_Active(tokenInput) {
  return oWebToken.sign(tokenInput, process.env.TOKEN_ACTIVATE, {
    expiresIn: "10m",
  });
}

function generate_Acess(tokenInput) {
  return oWebToken.sign(tokenInput, process.env.TOKEN_ACCESS, {
    expiresIn: "30m",
  });
}

function generate_Refresh(tokenInput) {
  return oWebToken.sign(tokenInput, process.env.TOKEN_REFRESH, {
    expiresIn: "3d",
  });
}

const emailValidation = (emailAddress) => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(emailAddress);
};

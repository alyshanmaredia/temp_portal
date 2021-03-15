const express = require('express')
const agentRouter = express.Router();
const Authentication = require('../middlewares/Authentication')
const AdminAuthentication = require('../middlewares/AdminAuthentication')
const agentController = require('../controller/agentController')


agentRouter.post('/signup', agentController.signUp);
agentRouter.post('/account_activation', agentController.mailActivation);
agentRouter.post('/signin', agentController.signIn);
agentRouter.post('/refresh_token', agentController.accessToken);
agentRouter.post('/forgot_password', agentController.passwordForgot);
agentRouter.post('/reset_password', Authentication, agentController.passwordReset);
agentRouter.get('/agentInfo', Authentication, agentController.AgentInfo)
agentRouter.get('/allAgentInfo', Authentication, AdminAuthentication, agentController.AllAgentInfo);
agentRouter.get('/signout', agentController.signOut);
agentRouter.patch('/editInfo', Authentication, agentController.editInfo);
agentRouter.patch('/changeRole/:id', Authentication, AdminAuthentication, agentController.makeAdmin);
agentRouter.delete('/removeAgent/:id', Authentication, AdminAuthentication, agentController.removeAgent);

module.exports = agentRouter
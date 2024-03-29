import Auth from './Auth'
import Common from './Common'
import Form from './form'
import Conversation from './Conversation'
import Project from './Project'
import Course from './Course'
import Class from './Class'
import Upload from './Upload'
import Profile from './Profile'
import Dashboard from './Dashboard'

export const Logic = {
  Auth: new Auth(),
  Common: new Common(),
  Form: new Form(),
  Conversation: new Conversation(),
  Project: new Project(),
  Course: new Course(),
  Class: new Class(),
  Upload: new Upload(),
  Profile: new Profile(),
  Dashboard: new Dashboard(),
}

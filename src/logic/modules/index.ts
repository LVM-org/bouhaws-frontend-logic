import Auth from './Auth'
import Common from './Common'
import Form from './Form'
import Conversation from './Conversation'
import Project from './Project'
import Course from './Course'
import BouhawsClass from './Class'
import Profile from './Profile'

export const Logic = {
  Auth: new Auth(),
  Common: new Common(),
  Form: new Form(),
  Conversation: new Conversation(),
  Project: new Project(),
  Course: new Course(),
  Class: new BouhawsClass(),
  Profile: new Profile(),
}

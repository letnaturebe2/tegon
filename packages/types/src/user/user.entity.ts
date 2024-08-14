import { Attachment } from '../attachment';
import { IntegrationAccount } from '../integration-account';
import { Issue } from '../issue';
import { Template } from '../template';
import { UsersOnWorkspaces } from '../users-on-workspaces';

export class User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  fullname: string | null;
  username: string;
  initialSetupComplete: boolean;
  anonymousDataCollection: boolean;
  usersOnWorkspaces?: UsersOnWorkspaces[];
  template?: Template[];
  createdBy?: Issue[];
  integrationAccount?: IntegrationAccount[];
  attachment?: Attachment[];
}
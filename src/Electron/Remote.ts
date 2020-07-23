import {remote} from 'electron';
import {DB} from '../Main/DB/DB';
import {BrowserViewProxy} from '../Main/BrowserViewProxy';
import {Config} from '../Main/Config';
import {GA} from '../Util/GA';
import {DateConverter} from '../Util/DateConverter';
import {StreamEmitter} from '../Main/Stream/StreamEmitter';
import {StreamLauncher} from '../Main/Stream/StreamLauncher';
import {SystemStreamLauncher} from '../Main/Stream/SystemStreamLauncher';
import {GitHubClient} from '../Main/GitHub/GitHubClient';
import {IssuesTable} from '../Main/DB/IssuesTable';
import {StreamsIssuesTable} from '../Main/DB/StreamsIssuesTable';

export const RemoteDB: typeof DB = remote.require('./Main/DB/DB').DB;
export const RemoteLogger = remote.require('color-logger').default;
export const RemoteStreamLauncher: typeof StreamLauncher = remote.require('./Main/Stream/StreamLauncher').StreamLauncher;
export const RemoteSystemStreamLauncher: typeof SystemStreamLauncher = remote.require('./Main/Stream/SystemStreamLauncher').SystemStreamLauncher;
export const RemoteStreamEmitter: typeof StreamEmitter = remote.require('./Main/Stream/StreamEmitter').StreamEmitter;
export const RemoteConfig: typeof Config = remote.require('./Main/Config').Config;
export const RemoteGitHubClient: typeof GitHubClient = remote.require('./Main/GitHub/GitHubClient').GitHubClient;
export const RemoteIssuesTable: typeof IssuesTable = remote.require('./Main/DB/IssuesTable').IssuesTable;
export const RemoteStreamsIssuesTable: typeof StreamsIssuesTable = remote.require('./Main/DB/StreamsIssuesTable').StreamsIssuesTable;
export const RemoteGA: typeof GA = remote.require('./Util/GA').GA;
export const RemoteDateConverter: typeof DateConverter = remote.require('./Util/DateConverter').DateConverter;
export const RemoteBrowserViewProxy: typeof BrowserViewProxy = remote.require('./Main/BrowserViewProxy').BrowserViewProxy;

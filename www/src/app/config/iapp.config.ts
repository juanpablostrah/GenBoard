
export interface IAppConfig {
  endpoints: {
    api: string;
    socketGameSet : string;
  }
  votesLimit: number;
  topHeroesLimit: number;
  snackBarDuration: number;
  repositoryURL: string;
}

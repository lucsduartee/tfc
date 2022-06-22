import teams from '../database/models/teams';
import matches from '../database/models/matches';
import ITeams from '../interfaces/ITeams';
import IMatches from '../interfaces/IMatches';

export interface ILeaderboardHome {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
}

export interface IDefTeams {
  team: ITeams,
  match: IMatches[],
}

export default class LeaderboardHomeService {
  static leaderboardHome: ILeaderboardHome[] | void = LeaderboardHomeService.leaderboardFactory();

  static async getHomiesAndMatches() {
    const homies: ITeams[] = await teams.findAll();
    const finishMatches: IMatches[] = await matches.findAll({ where: { inProgress: false } });

    const defTeams = homies.reduce((acc: IDefTeams[], home) => {
      const finishMatchesFiltred = finishMatches
        .reduce((acc2: IMatches[], finishMatch) => {
          if (finishMatch.homeTeam === home.id) {
            acc2.push(finishMatch);
          }

          return acc2;
        }, []);

      acc.push({ team: home, match: finishMatchesFiltred });
      return acc;
    }, []);

    return defTeams as IDefTeams[];
  }

  static leaderboardFactory() {

  }
}

LeaderboardHomeService.getHomiesAndMatches();

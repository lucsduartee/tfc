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

export default class LeaderBrdHome {
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

  static getTotalPoints(matchs: IMatches[]): number {
    const totalPoints = matchs.reduce((acc, match) => {
      let count: number = acc;
      switch (true) {
        case match.homeTeamGoals > match.awayTeamGoals:
          count += 3;
          return count;
        case match.homeTeamGoals === match.awayTeamGoals:
          count += 1;
          return count;
        case match.homeTeamGoals < match.awayTeamGoals:
          count += 0;
          return count;
        default:
          return acc;
      }
    }, 0);
    return totalPoints;
  }

  static getResults(matchs: IMatches[]): number[] {
    const totalPoints = matchs.reduce(([vic, emp, derr], match) => {
      let victory = vic;
      let loss = derr;
      let draw = emp;
      switch (true) {
        case match.homeTeamGoals > match.awayTeamGoals:
          victory += 1;
          return [victory, emp, derr];
        case match.homeTeamGoals === match.awayTeamGoals:
          draw += 1;
          return [vic, draw, derr];
        case match.homeTeamGoals < match.awayTeamGoals:
          loss += 1;
          return [vic, emp, loss];
        default: return [vic, emp, derr];
      }
    }, [0, 0, 0]);

    return totalPoints;
  }

  static getGoals(matchs: IMatches[]): number[] {
    const [goalsFavor, goalsOwn] = matchs.reduce(([goalsFav, goalsOw], match) => {
      let gF = goalsFav;
      let gO = goalsOw;
      gF += match.homeTeamGoals;
      gO += match.awayTeamGoals;

      return [gF, gO];
    }, [0, 0]);

    return [goalsFavor, goalsOwn, goalsFavor - goalsOwn];
  }

  static getEfficiency(points: number, rounds: number) {
    return ((points / (rounds * 3)) * 100).toFixed(2);
  }

  static builderLeaderboardHome(teamsAndMatches: IDefTeams[]) {
    return teamsAndMatches.map((teamsAndMatch) => {
      const [totalVictories, totalDraws, totalLosses] = LeaderBrdHome
        .getResults(teamsAndMatch.match);

      return {
        name: teamsAndMatch.team.teamName,
        totalPoints: LeaderBrdHome.getTotalPoints(teamsAndMatch.match),
        totalGames: teamsAndMatch.match.length,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor: LeaderBrdHome.getGoals(teamsAndMatch.match)[0],
        goalsOwn: LeaderBrdHome.getGoals(teamsAndMatch.match)[1],
        goalsBalance: LeaderBrdHome.getGoals(teamsAndMatch.match)[2],
        efficiency: Number(LeaderBrdHome
          .getEfficiency(LeaderBrdHome
            .getTotalPoints(teamsAndMatch.match), teamsAndMatch.match.length)),
      };
    });
  }

  static async leaderboardFactory() {
    const teamsAndMatches = await LeaderBrdHome.getHomiesAndMatches();
    const result = LeaderBrdHome.builderLeaderboardHome(teamsAndMatches);
    return result.sort((defTeamA, defTeamB) => {
      let order = defTeamB.totalPoints - defTeamA.totalPoints;
      if (order === 0) {
        order = defTeamB.totalVictories - defTeamA.totalVictories;
        if (order === 0) {
          order = defTeamB.goalsBalance - defTeamA.goalsBalance;
          if (order === 0) {
            order = defTeamB.goalsFavor - defTeamA.goalsFavor;
            if (order === 0) {
              order = defTeamB.goalsOwn - defTeamA.goalsOwn;
            }
          }
        }
      }
      return order;
    });
  }
}

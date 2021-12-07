import Transformer from './Transformer';

export default class LeaderboardTransformer extends Transformer {
    static fetch(item) {
        return {
            leaderBoardId: item.leaderBoardId,
            displayName: item.displayName,
            gameType: item.gameType,
            loyaltyProgramId: item.loyaltyProgramId,
            referralProgramId: item.referralProgramId,
            quizId: item.quizId,
            primaryScoreType: item.primaryScoreType,
            primaryScoreSort: item.primaryScoreSort,
            secondaryScoreType: item.secondaryScoreType,
            secondaryScoreSort: item.secondaryScoreSort,
            periodRankings: item.periodRankings,
            showTop3: item.showTop3,
            showYou: item.showYou,
            showPeriods: item.showPeriods,
            showAvatars: item.showAvatars,
            showSecondaryScore: item.showSecondaryScore,
            cssUrl: item.cssUrl,
            desktopBackgroundImageUrl: item.desktopBackgroundImageUrl,
            mobileBackgroundImageUrl: item.mobileBackgroundImageUrl
        };
    }

    static fetchList(array) {
        return array.map(item => {
            return {
                leaderBoardId: item.leaderBoardId,
                displayName: item.displayName,
                gameType: item.gameType,
                loyaltyProgramId: item.loyaltyProgramId,
                referralProgramId: item.referralProgramId,
                quizId: item.quizId,
                primaryScoreType: item.primaryScoreType,
                primaryScoreSort: item.primaryScoreSort,
                secondaryScoreType: item.secondaryScoreType,
                secondaryScoreSort: item.secondaryScoreSort,
                periodRankings: item.periodRankings,
                showTop3: item.showTop3,
                showYou: item.showYou,
                showPeriods: item.showPeriods,
                showAvatars: item.showAvatars,
                showSecondaryScore: item.showSecondaryScore,
                cssUrl: item.cssUrl,
                desktopBackgroundImageUrl: item.desktopBackgroundImageUrl,
                mobileBackgroundImageUrl: item.mobileBackgroundImageUrl
            };
        });
    }

    static send(item) {
        return {
          leaderBoardId: item.leaderBoardId,
          displayName: item.displayName,
          gameType: item.gameType,
          loyaltyProgramId: item.loyaltyProgramId,
          referralProgramId: item.referralProgramId,
          quizId: item.quizId,
          primaryScoreType: item.primaryScoreType,
          primaryScoreSort: item.primaryScoreSort,
          secondaryScoreType: item.secondaryScoreType,
          secondaryScoreSort: item.secondaryScoreSort,
          periodRankings: item.periodRankings,
          showTop3: item.showTop3,
          showYou: item.showYou,
          showPeriods: item.showPeriods,
          showAvatars: item.showAvatars,
          showSecondaryScore: item.showSecondaryScore,
          cssUrl: item.cssUrl,
          desktopBackgroundImageUrl: item.desktopBackgroundImageUrl,
          mobileBackgroundImageUrl: item.mobileBackgroundImageUrl
        };
    }
}

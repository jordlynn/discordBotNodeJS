const SteamAPI = require('steamapi');
var auth = require('./auth.json');
const steam = new SteamAPI(auth.SteamToken);

class SteamAccessor {

	constructor() {

		this.steamBuddies = ['76561197983583612', '76561198255784615', 
							 '76561198796497705', '76561198084309987',
							 '76561198118746661', '76561198094385374',
							 '76561198060493772', '76561198201493946',
                             '76561198316904918', '76561198025473290'];
	}

    initializeUsers() {
        var promises = [];
        for (let steamID of this.steamBuddies) {
            promises.push(steam.getUserSummary(steamID));
        }
        return Promise.all(promises).then(values => {
            this.ddawgs = values;
            console.log("done steam init");
        });
	}

    async getTopDawg() {
        var dawgs = this.ddawgs
        for (let steamUser of dawgs) {
            var games = steam.getUserOwnedGames(steamUser.steamID);
            steamUser.totalPlayTime = 0;
            games.then(gameSummary => {
                for (let game of gameSummary) {
                    steamUser.totalPlayTime += game.playTime;
                }
                dawgs.sort((a, b) => (a.totalPlayTime < b.totalPlayTime) ? 1 : -1);
                for (let user of dawgs) {
                    console.log(user.nickname + " " + user.totalPlayTime);
                }
                
            });
        }
	}
}

module.exports = SteamAccessor;
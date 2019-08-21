const SteamAPI = require('steamapi');
const steam = new SteamAPI('B0D1C32C37233029FD993F8C28E63555');

steam.resolve('https://steamcommunity.com/id/theegeekmew').then(id => {
    console.log(id); // 76561198146931523
});

steam.getUserSummary('76561197983583612').then(summary => {
    //console.log(summary);
    /**
    PlayerSummary {
        avatar: {
            small: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/7f/7fdf55394eb5765ef6f7be3b1d9f834fa9c824e8.jpg',
            medium: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/7f/7fdf55394eb5765ef6f7be3b1d9f834fa9c824e8_medium.jpg',
            large: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/7f/7fdf55394eb5765ef6f7be3b1d9f834fa9c824e8_full.jpg'
        },
        steamID: '76561198146931523',
        url: 'http://steamcommunity.com/id/DimGG/',
        created: 1406393110,
        lastLogOff: 1517725233,
        nickname: 'Dim',
        primaryGroupID: '103582791457347196',
        personaState: 1,
        personaStateFlags: 0,
        commentPermission: 1,
        visibilityState: 3
    }
    */
});

steam.getUserOwnedGames('76561198025473290').then(summar => {

	//console.log(summar);
});

function steamFriend(userSummary) {
	this.userSummary = userSummary;
}

class SteamAccessor {

	constructor() {

		this.steamBuddies = ['76561197983583612', '76561198255784615', 
							 '76561198796497705', '76561198084309987',
							 '76561198118746661', '76561198094385374',
							 '76561198060493772', '76561198201493946',
							 '76561198316904918'];
		this.steamFriendsGroomed = [];
	}

	initializeUsers() {
		var promises = [];
		for(let steamID of this.steamBuddies) {
			promises.push(steam.getUserSummary(steamID));
		}
	}

	getTopDawg() {
		console.log()
		for(let steamUser of this.steamFriendsGroomed) {
			var games = steam.getUserOwnedGames(steamUser.steamID);
			games.then(gameSummary => {
				console.log(gameSummary);
			});
		}
	}
}

var steamObj = new SteamAccessor();

steamObj.getTopDawg();
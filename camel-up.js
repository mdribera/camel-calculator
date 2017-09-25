var _ = require('lodash');
var mockData = require('./camel-up.json');

/*
CALCULATE EACH CAMEL'S ODDS OF GETTING FIRST OR SECOND PLACE IN THE LEG
1. find all possible dice rolls
2. simulate camel movement and leg winners
3. record how many times each camel gets first or second place
4. PROFIT
*/

console.log(calculateOdds(mockData['same-space']));

function calculateOdds(data) {
	var oc = data.camels;
	var rolls = getAllDieCombos(oc);
	console.log('total roll senarios', rolls.length);

	var stats = _.reduce(oc, function(prev, camel) {
		prev[camel.color] = {'firsts': 0, 'seconds': 0}
		return prev;
	}, {});

	_.forEach(rolls, function(roll) {
		var copyCamels = _.cloneDeep(oc);
		var legOutcome = runLeg(roll, copyCamels);
		var legWinners = getFirstAndSecond(legOutcome);

		stats[legWinners[0]].firsts++;
		stats[legWinners[1]].seconds++;
	});

	// compute percentages
	_.forEach(stats, function(camel, color) {
		var firstPercent = Math.round((camel.firsts / rolls.length) * 1000) / 10;
		var secondPercent = Math.round((camel.seconds / rolls.length) * 1000) / 10;
		stats[color].firsts = firstPercent.toFixed(1) + '%';
		stats[color].seconds = secondPercent.toFixed(1) + '%';
	});

	return stats;
}

function rollRandomDie(camels) {
	var num = Math.floor(Math.random() * 3) + 1;
	var color = _.shuffle(_.filter(camels, ['rolled', false]))[0].color;

	return {color: color, num: num};
}


/*
GET ALL POSSIBLE ROLLS WITH CURRENT CAMEL ELIGIBILITY
1. find unrolled die colors
2. find all possible orders in which those dice could be rolled 
3. find all possible rolls that could be made
*/

// console.log(getAllDieCombos(mockData['same-space'].camels).length);

function getAllDieCombos(camels) {
	var eligibleDice = _.map(_.filter(camels, ['rolled', false]), 'color');
	console.log('number of dice', eligibleDice.length);
	var diceOrders = [];
	dicePermute(eligibleDice, diceOrders);
	console.log('roll order combos', diceOrders.length);

	return _.reduce(diceOrders, function(prev, dice) {
		return prev.concat(_.chunk(rollDice(dice), eligibleDice.length));
	}, []);
}

function rollDice(array, prefix) {
	// console.log('array', array);
    prefix = prefix || [];
    if (!array.length) {
        return prefix;
    }

	return [1,2,3].reduce(function (result, value) {
        var newPrefix;

        if(prefix.length){
        	newPrefix = _.clone(prefix);
            newPrefix.push({'color': array[0], 'num': value})
        } else {
            newPrefix = [{'color': array[0], 'num': value}];
        }

        var perm = rollDice(array.slice(1), newPrefix);
        // console.log('perm', perm);
        return result.concat(perm);
    }, []);
}

// implementation of Heap's permutation algorithm
function dicePermute(camels, result, n) {
	n = n || camels.length;

	if (n == 1) {
		result.push(_.clone(camels));
	} else {
		for (var i=0;i<n-1;i++) {
			dicePermute(camels, result, n-1);
			if(n%2) {
				swap(camels, 0, n-1);
			} else {
				swap(camels, i, n-1);
			}
		}
		dicePermute(camels, result, n-1);
	}
}

function swap(array, pos1, pos2) {
	var temp = array[pos1];
	array[pos1] = array[pos2];
	array[pos2] = temp
}


/*
DETERMINE FIRST AND SECOND PLACE OF A LEG GIVEN A SET OF DICE ROLLS
1. iterate through dice rolls
2. move camel with corresponding color and accompanying stack
3. calculate new space and stack positions for camels
*/

// console.log(getFirstAndSecond(runLeg(mockData['random-rolls'], mockData['same-space'].camels)));
// console.log(runLeg(mockData['random-rolls'], mockData['same-space'].camels));

function getFirstAndSecond(camels) {
	camels = _.orderBy(camels, ['space', 'stack'], ['desc', 'desc']);

	return _.map(_.dropRight(camels, 3), function (camel) {
		return camel.color;
	});
}

function runLeg(rolls, camels) {
	while (rolls.length) {
		// console.log('camels', camels);
		// console.log('roll', rolls[0]);
		camels = moveCamel(rolls.shift(), camels);
	}
	return camels;
}

function moveCamel(roll, camels) {
	var rolledCamel = _.clone(_.find(camels, ['color', roll.color]));
	var receivingStackHeight = _.filter(camels, ['space', rolledCamel.space + roll.num]).length;

	_.forEach(camels, function(camel) {
		if (camel.space === rolledCamel.space && camel.stack >= rolledCamel.stack) {
			camel.space += roll.num;
			camel.stack += receivingStackHeight - rolledCamel.stack;
		}
	});

	return camels;
}



/* 


b
r  
w  g

*/
const fs = require('fs');
global.window = {};
let tableJs = fs.readFileSync('play.pokemonshowdown.com/data/teambuilder-tables.js', 'utf8');
let m = tableJs.match(/exports\.BattleTeambuilderTable = (\{.*?\});/s);
if (!m) m = tableJs.match(/exports\.BattleTeambuilderTable=(\{.*?\});/s);
if (!m) {
    let lines = tableJs.split('\n');
    let jsonStart = lines[2].indexOf('{');
    let jsonStr = lines[2].substring(jsonStart, lines[2].length - 2); // remove );
    window.BattleTeambuilderTable = JSON.parse(jsonStr);
} else {
    window.BattleTeambuilderTable = eval('(' + m[1] + ')');
}
let bdData = fs.readFileSync('play.pokemonshowdown.com/js/battle-dex-data.js', 'utf8');
eval(bdData.replace('function Species', 'global.Species = function Species'));
let dummyDex = {
    gen: 9,
    species: { get(id) { return {id, name: id}; } },
    items: { get(id) { return {id, name: id, exists: false}; } },
    abilities: { get(id) { return {id, name: id}; } },
    moves: { get(id) { return {id, name: id}; } },
    forGen: function(){return this;}
};
global.Dex = dummyDex;
let data = Object.assign({}, window.BattleTeambuilderTable['gen7mod'].overrideDexInfo['absolmegaz']);
Object.assign(data, window.BattleTeambuilderTable['gen7mod'].overrideSpeciesData['absolmegaz']);
let s = new global.Species('absolmegaz', 'Absol-Mega-Z', data);
console.log('REQUIRED ITEMS:', s.requiredItems);

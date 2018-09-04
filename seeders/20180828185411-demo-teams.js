'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('teams', [
      {
      "id": 1,
      "name": "Dietrich LLC"
    }, {
      "id": 2,
      "name": "Stokes-Douglas"
    }, {
      "id": 3,
      "name": "Ziemann, Schmeler and Bailey"
    }, {
      "id": 4,
      "name": "Skiles-Stokes"
    }, {
      "id": 5,
      "name": "Wolf, Paucek and Schumm"
    }, {
      "id": 6,
      "name": "Walter-Cummerata"
    }, {
      "id": 7,
      "name": "Macejkovic-Price"
    }, {
      "id": 8,
      "name": "Heaney, Kling and Mohr"
    }, {
      "id": 9,
      "name": "Howell, Klocko and Dach"
    }, {
      "id": 10,
      "name": "Okuneva-Kunze"
    }, {
      "id": 11,
      "name": "Morissette-Goyette"
    }, {
      "id": 12,
      "name": "Emard Group"
    }, {
      "id": 13,
      "name": "Bailey and Sons"
    }, {
      "id": 14,
      "name": "Connelly, Hahn and Gleichner"
    }, {
      "id": 15,
      "name": "Cassin, Nicolas and Robel"
    }, {
      "id": 16,
      "name": "Gislason, Treutel and Ortiz"
    }, {
      "id": 17,
      "name": "Osinski-Lockman"
    }, {
      "id": 18,
      "name": "Bergnaum-Hodkiewicz"
    }, {
      "id": 19,
      "name": "Schaden, Considine and Senger"
    }, {
      "id": 20,
      "name": "Weber LLC"
    }, {
      "id": 21,
      "name": "Pouros, Pagac and Smitham"
    }, {
      "id": 22,
      "name": "Beer LLC"
    }, {
      "id": 23,
      "name": "Kiehn-Steuber"
    }, {
      "id": 24,
      "name": "Gottlieb, Barrows and Beatty"
    }, {
      "id": 25,
      "name": "Kassulke-Little"
    }, {
      "id": 26,
      "name": "Gaylord, Padberg and Stamm"
    }, {
      "id": 27,
      "name": "Macejkovic, Kirlin and Dickinson"
    }, {
      "id": 28,
      "name": "Kozey, Streich and Stehr"
    }, {
      "id": 29,
      "name": "Mitchell, Schneider and Bogisich"
    }, {
      "id": 30,
      "name": "Deckow and Sons"
    }, {
      "id": 31,
      "name": "Schneider, Howe and Borer"
    }, {
      "id": 32,
      "name": "Wisozk, Larkin and Wiza"
    }, {
      "id": 33,
      "name": "Gutkowski-Goldner"
    }, {
      "id": 34,
      "name": "Franecki Inc"
    }, {
      "id": 35,
      "name": "Champlin Group"
    }, {
      "id": 36,
      "name": "Hilpert, Powlowski and Greenholt"
    }, {
      "id": 37,
      "name": "Boehm, Keebler and Toy"
    }, {
      "id": 38,
      "name": "Kovacek LLC"
    }, {
      "id": 39,
      "name": "Lemke, Donnelly and Dickens"
    }, {
      "id": 40,
      "name": "Pollich, Goodwin and Runolfsdottir"
    }, {
      "id": 41,
      "name": "Hayes LLC"
    }, {
      "id": 42,
      "name": "Frami Group"
    }, {
      "id": 43,
      "name": "McClure Inc"
    }, {
      "id": 44,
      "name": "Jacobson-Stiedemann"
    }, {
      "id": 45,
      "name": "Rempel-Corwin"
    }, {
      "id": 46,
      "name": "Cronin LLC"
    }, {
      "id": 47,
      "name": "Sporer-Gusikowski"
    }, {
      "id": 48,
      "name": "Hauck LLC"
    }, {
      "id": 49,
      "name": "Stehr LLC"
    }, {
      "id": 50,
      "name": "Swaniawski LLC"
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teams', null, {});
  }
};

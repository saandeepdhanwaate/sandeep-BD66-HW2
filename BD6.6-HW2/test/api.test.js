const request = require("supertest");
const { app } = require("../index");
const http = require("http");

const { getAllGames, getGameById } = require("../controllers/index.controller");
const { describe } = require("node:test");

jest.mock("../controllers/index.controller", () => ({
  ...jest.requireActual("../controllers/index.controller"),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API endpoint test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Exercise 3: Test Retrieve All Games
  it("should return all games with 200 status code", async () => {
    let mockGame = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];

    getAllGames.mockReturnValue(mockGame);
    let result = await request(server).get("/games");
    expect(result.status).toBe(200);
    expect(result.body.games).toEqual(mockGame);
  });

  // Exercise 4: Test Retrieve Game by ID
  it("should return game id 2 with 200 status code", async () => {
    let mockGame = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
    ];

    getGameById.mockReturnValue(mockGame);
    let result = await request(server).get("/games/details/1");
    expect(result.status).toBe(200);
    expect(result.body.game).toEqual(mockGame);
  });
});

describe("controll function test", () => {
  // Exercise 5: Mock the Get All Games Function

  it("should return all games within GET /games", () => {
    let mockGame = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];

    let result = getAllGames();
    expect(result).toEqual(mockGame);
  });
});

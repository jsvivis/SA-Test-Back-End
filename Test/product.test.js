import request from "supertest";
import { expect } from "chai";
import app from "../app.js";

describe("API Tests", () => {
  // Teste login
  describe("POST /login", () => {
    it("deve aceitar credenciais válidas", async () => {
      const response = await request(app).post("/login").send({
        username: "escorpiao",
        password: "escorpiao",
      });

      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Login realizado com sucesso");
    });

    it("Não deve aceitar credenciais inválidas", async () => {
      const res = await request(app).post("/login").send({
        username: "lua",
        password: "lua",
      });

      expect(res.status).to.equal(401);
      expect(res.body.message).to.equal("Credenciais inválidas");
    });
  });

  // Teste CRUD
  describe("CRUD dos Produtos", () => {
    let productId;

    it("Cria um novo produto", async () => {
      const response = await request(app).post("/products").send({
        name: "Novo Game",
        price: 100,
        stock: 120,
      });

      expect(response.status).to.equal(201);
      expect(response.body.name).to.equal("Novo Game");
      productId = response.body.id; 
    });

    it("Recupera um produto pelo ID", async () => {
      const response = await request(app).get(`/products/${productId}`);

      expect(response.status).to.equal(200);
      expect(response.body.id).to.equal(productId);
    });

    it("Atualiza um produto", async () => {
      const response = await request(app).put(`/products/${productId}`).send({
        name: "Jogo Atualizado",
        price: 140,
      });

      expect(response.status).to.equal(200); 
      expect(response.body.name).to.equal("Jogo Atualizado");
      expect(response.body.price).to.equal(140);
    });

    it("Deleta produto", async () => {
      const response = await request(app).delete(`/products/${productId}`);
      
      expect(response.status).to.equal(204);
    });
  });
});

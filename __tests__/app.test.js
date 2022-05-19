const db= require('../db/connection.js');
const seed= require('../db/seeds/seed.js');
const data= require('../db/data/test-data');
const request= require('supertest');
const app = require('../app.js');




beforeEach(()=>seed(data))
afterAll(()=>{
    db.end()
})

describe('/api/topics',()=>{
    test('GET-200 - Should response with an array of topics',()=>{
        return request(app).get('/api/topics').then((response)=>{
            expect(response.status).toBe(200)
            const topics= response.body.topics
            expect(Array.isArray(topics)).toBe(true)
            expect(topics.length).toBe(3)
            topics.forEach((topic)=>{
                 expect(topic).toMatchObject({
                     slug: expect.any(String), 
                     description: expect.any(String)
                 })
            })
        })
    })
    test('GET-404 - Returns a not found message when the topic does not exist',()=>{
        return request(app)
        .get('/api/topi')
        .expect(404)
        .then((result)=>{ 
            expect(result.body.msg).toBe("not found")
        })
    })
    
})

describe('/api/articles/:article_id',()=>{
    test('GET-200 - Should responds with an object of article',()=>{
        return request(app).get('/api/articles/9')
        .expect(200)
        .then(({body})=>{
            const singleArticle={
                article_id: 9,
                title: "They're not exactly dogs, are they?",
                topic: "mitch",
                author: "butter_bridge",
                body: "Well? Think about it.",
                created_at:  "2020-06-06T09:10:00.000Z",
                votes: 0,
              }

            expect(body).toEqual(singleArticle)
        })
    })
    test('GET-404 - Returns a not found message when the article does not exist',()=>{
        return request(app)
        .get('/api/articles/999999')
        .expect(404)
        .then((result)=>{
          expect(result.body.msg).toBe("not found")
        })
  })
  test("GET-400 - Responds with status code 400 and msg 'bad request' when entering wrong data type for article_id", () => {
    return request(app)
      .get("/api/articles/bananas")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
}); 




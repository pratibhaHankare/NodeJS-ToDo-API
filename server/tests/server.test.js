/*requiring the expect & supertest*/
const expect=require('expect');
const request=require('supertest');
const {ObjectID}=require('mongodb');
/*require some local files that is used for testing*/
const {app}=require('./../server');
const {Todo}=require('./../models/todo');

/*adding the data that is required to fetch from in some test suites*/
const todos=[
  {
    _id:new ObjectID(),
    text:'First test todo'
  },{
    _id:new ObjectID(),
    text:'Second test todo'
  }
];
/**dropping documents before the test suite is ran **/
beforeEach((done)=>{
  Todo.remove({}).then(
    ()=>{
    return Todo.insertMany(todos);
  }
).then(
  ()=>done()
);
});
/*describe() ->allows to group the multiple routes*/
/*********************************************************************************************************************/
//describe block for Todos
describe(('POST /todos'),()=>{
  //starting the test case
  /*checking if test data is been inserted correctly or not*/
 it('should create a new todo',(done)=>{
    var text='Test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }
        Todo.find({text}).then(
          (todos)=>{
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }
        ).catch((e)=>done(e))
      });
  });

  /*challenge:- checking if there is invalid data is entered*/
  it('should not create todo with invalid body data',(done)=>{
      request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end(
          (err,res)=>{
            if(err){
              return done(err);
            }
            //cross checking with DB
            Todo.find().then(
              (todos)=>{
                expect(todos.length).toBe(2);
                done();
              }
            ).catch(
              (e)=>done(e)
            );
          });
  });
});
/*********************************************************************************************************************/
//test suites for GET
describe('GET /todos',()=>{
  //test case
  it('should get all todos',(done)=>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect(
        (res)=>{
          expect(res.body.todos.length).toBe(2);
        }
      )
      .end(done);
  });
});
/*********************************************************************************************************************/
//test suites for for GET/todos/id
describe('GET /todos/:id',()=>{
  //test case
  it('should return todo doc',(done)=>{
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(
        (res)=>{
          expect(res.body.todo.text).toBe(todos[0].text);
        }
      )
      .end(done);
  });

  it('should return 404 if todo not found',(done)=>{
      var hexId=new ObjectID().toHexString();
      request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
  });
  it('should return 404 for non-object ids',(done)=>{
    request(app)
      .get('/todos/123acb')
      .expect(404)
      .end(done);
  });


});

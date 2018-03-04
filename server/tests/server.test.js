/*requiring the expect & supertest*/
const expect=require('expect');
const request=require('supertest');
const {ObjectID}=require('mongodb');
const {User}=require('./../models/user');
/*require some local files that is used for testing*/
const {app}=require('./../server');
const {Todo}=require('./../models/todo');
//requiring the seed file
const {todos,populateTodos,users,populateUser}=require('./seed/seed');

/*adding the data that is required to fetch from in some test suites*/
/*this function is moved to the seed/seed.js*/
/**dropping the document of user & filling it again**/
beforeEach(populateUser);
/**dropping documents before the test suite is ran **/
beforeEach(populateTodos);
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
/*********************************************************************************/
describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});
/*********************************************************************************/
describe('PATCH /todos/:id',()=>{
  //should update the todo
  /*
  grab id of first item
  update text,set completed TRUE
  200
  text changed,completed is true,completedAt is a number .toBeA
  */
  it('should update the text of todo',(done)=>{
    var hexId = todos[0]._id.toHexString();
    var text='This should be new text';
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed:true,
        text
      })
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });
  /*
  grab id of second todo item
  update text,set completed to false
  200
  text is changed,completed false,completedAt is null .toNotExit
  */
  it('should clear completedAt when todo is not completed', (done) => {
   var hexId = todos[1]._id.toHexString();
   var text = 'This should be the new text!!';

   request(app)
     .patch(`/todos/${hexId}`)
     .send({
       completed: false,
       text
     })
     .expect(200)
     .expect((res) => {
       expect(res.body.todo.text).toBe(text);
       expect(res.body.todo.completed).toBe(false);
       expect(res.body.todo.completedAt).toNotExist();
     })
     .end(done);
 });
});
/*********************************************************************************/
/**writing test cases for the /user/me**/
describe('GET /users/me',()=>{
  //console.log(users[0].tokens[0].tokens);
  //it shuld return the user if authenticated
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });
  //return 401 if the user is not authenticated
  it('should rerurn 401 if not authenticated',(done)=>{
    request(app)
      .get('/users/me')
      .expect(401)
      .expect(
        (res)=>{
          expect(res.body).toEqual({});
        }
      )
      .end(done);
  })
});
/*********************************************************************************/
/***writing the test case for user at sign up*/
describe('POST /users',()=>{
    //test case for creating a user
    it('should create a user',(done)=>{
      var email ='exaple@example.com';
      var password='123abc';
      request(app)
        .post('/users')
        .send({email,password})
        .expect(200)
        .expect( (res)=>{
          expect(res.header['x-auth']).toExist();
          expect(res.body._id).toExist();
          expect(res.body.email).toBe(email);
        })
        .end((err)=>{
          if(err){
            return done(err);
          }
          User.findOne({email}).then( (user)=>{
            expect(user).toExist();
            expect(user.password).toNotBe(password);
            done();

          });
        });
    });
    /**if invalid email is pasword**/
    it('should return validation errors if request in valid ',(done)=>{
      request(app)
        .post('/users')
        .send({
          email:'and',
          password:'123'
        })
        .expect(400)
        .end(done);
    });
    /**to check if the email is in use **/
    it('should not create user if email in use',(done)=>{
      request(app)
        .post('/users')
        .send({
          email:users[0].email,
          password:'Password123!'
        })
        .expect(400)
        .end(done);
    });
});//end describe

//test case for /user/login
/*checking if
1.to get x-auth token back on passing valid email and Password
2. if login credentials donn match db than written 400 error*/
describe('POST /users/login', () => {
  it('should login user and return auth token', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {;
          expect(user.tokens[0]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((e) => done(e));
      });
  });

  it('should reject invalid login', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password + '1'
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});

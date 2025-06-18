import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useForm } from 'react-hook-form';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios'
import MealPlanner from './meal-planner';
import './meal-planner.css';
import TestTableForm from './components/pages/TestTableForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TestTableForm2 from './components/pages/TestTableForm';
import Test from './Test';

function App() {
  // zod schema
  const schema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(1),
  });

  // zod validation
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: any) => console.log(data);
  console.log(errors);

  // // 通信
  // axios.get("http://localhost:8080/api/testTables")
  //   .then((results) => {
  //     console.log(results.data);
  //   })
  //   .catch((error) => {
  //     console.log('失敗');
  //     console.log(error.status);
  //   });

  /*
  return (
    <>

      <AccessAlarmIcon></AccessAlarmIcon>アイコン
      <MealPlanner></MealPlanner>
      {/* 改行で
      <div><AccessAlarmIcon />入力フォーム</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder='Text1' {...register("Text1")} />
        <input type="text" placeholder="Text2" {...register("Text2", { required: true })} />
        {errors.Text2 && <span>This field is required</span>}

        <input type="submit" />
      </form>

      {/* zod sample}
      <div className="App">
        <h1>ログイン</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" {...register('email', { required: true })} />
            <p>{errors.email?.message}</p>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" {...register('password')} type="password" />
            <p>{errors.password?.message}</p>
          </div>
          <button type="submit">ログイン</button>
        </form>
      </div>
    </>
  );
}*/
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/add/:id" element={<TestTableForm />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;

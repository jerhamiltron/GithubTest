import { useState, useEffect } from 'react';
import './App.css';

import { Configuration, OpenAIApi } from 'openai';

const SECRET_KEY = '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';

const config = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(config);

const url = 'https://api.openai.com/v1/completions';

const DEFAULT_PARAMS = {
  model: 'text-davinci-003',
  temperature: 1,
  max_tokens: 2048,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);

  useEffect(() => {
    console.log('reboot');
  }, []);

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = runPrompt().then((data) => setResponse(data));
    // setResponse(res);
    setPrompt('');
  };

  const runPrompt = async (params = { prompt: prompt }) => {
    // const tempRes = await openai.createCompletion({
    //   model: 'text-davinci-003',
    //   prompt: prompt,
    //   max_tokens: 2048,
    //   temperature: 1.0,

    const params_ = { ...DEFAULT_PARAMS, ...params };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + SECRET_KEY,
      },
      body: JSON.stringify(params_),
    };
    const res = await fetch(url, requestOptions);
    const data = await res.json();
    return data.choices[0].text;
  };

  return (
    <>
      <form className='promptContainer' onSubmit={handleSubmit}>
        <div className='prompt'>
          <input
            value={prompt}
            type='text'
            id='prompt'
            className='prompt-input'
            onChange={handleChange}
          />
          <button type='submit' className='button'>
            Submit
          </button>
        </div>
      </form>
      <section className='responseContainer'>
        <div className='response'>
          <h3>{response ? `Answer:` : 'Waiting for data...'}</h3>
          {response && <p>{response}</p>}
          <button type='button' onClick={() => console.log(response)}>
            CLICK
          </button>
        </div>
      </section>
    </>
  );
}

export default App;

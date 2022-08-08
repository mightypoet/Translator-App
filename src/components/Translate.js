import './translate.css';
import {useEffect, useState} from 'react';
const axios = require('axios').default;

function Translate() {
const [options, setOptions] = useState([]);
const [to,setTo] = useState('en');
const [from,setFrom] = useState('en');
const [input,setInput] = useState('')
const [output,setOutput] = useState('')

const translate = () => {
    
    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target',to);
    axios.post('https://libretranslate.de/translate',params, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(res=>{
        setOutput(res.data.translatedText)
      })
    };
   

useEffect(() => {
    axios
    .get('https://libretranslate.de/languages',{
        headers: {accept: 'application/json'},
    })
    .then((res) => {
        console.log(res.data);
        setOptions(res.data);

    });

}, []);

return (
    <div classname="Translate">
        <div>
            <h3>Language Translator</h3>
            <select onChange={(e) => setFrom(e.target.value)}>
                {options.map((opt) => (
                    <option key={opt.code} value={opt.code}>
                        {opt.name}
                    </option>
                ))}
            </select>

        </div>
        <div classname ="box1">
            <textarea cols = "30" rows= "10"
            onInput = {(e) => setInput(e.target.value)}>
                Write here
            </textarea>
        </div><select onChange={(e) => setTo(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        <div>

        </div>
        <div className = 'box2'>
        <textarea cols = "30" rows= "10" value= {output}> GET TRANSLATION </textarea>

        </div>
        <div>
            <button className= 'btn' onClick= {e=>translate()}>TRANSLATE</button>
        </div>

    </div>
)

}
export default Translate;
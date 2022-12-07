const sounds = [
  {
    key: 'Q',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    key: 'W',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    key: 'E',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    key: 'A',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    key: 'S',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    key: 'D',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    key: 'Z',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    key: 'X',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    key: 'C',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  },
]

const App = () => (
        <div id="display" className="display">
    <h1>Play a Letter</h1>
          {sounds.map((sound, idx) => (
            <DrumPad text={sound.key} key={idx} audio={sound.mp3} />
          ))}
        </div> 
);

class DrumPad extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.audio = React.createRef();
  }
  
  componentDidMount() {
    this.audio.current.addEventListener('ended', (e) => {
      const parent = e.target.parentNode;
      parent.classList.remove('active')
    })
  }
  playSound = () => {
    this.audio.current.play();
    
   const id = this.audio.current.id
    
    const parent = this.audio.current.parentNode;
    parent.classList.add('active');
    
    const display = parent.parentNode;
    display.querySelector('h1').innerText = `${id} is playing`;
  }
  
  
  
  render() {
    const {text, audio} = this.props;
    
    return (
      <div className="box drum-pad" onClick={this.playSound}
       id={`drum-${text}`}>
       {text}
        <audio ref={this.audio} src={audio} className="clip" id={text} />
      </div>
    )
  }
}  

document.addEventListener('keydown', (e) => {
  const id = e.key.toUpperCase();
  const audio = document.getElementById(id);
  
  if(audio) {
    audio.currentTime = 0;
    const parent = audio.parentNode;
    parent.classList.add('active');
    
    const display = parent.parentNode;
    display.querySelector('h1').innerText = `${id} is playing`;
    audio.play();
  }
});

ReactDOM.render(<App />, document.getElementById('drum-machine'));
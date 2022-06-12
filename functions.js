
audioctx = new AudioContext();


function oscwave(start,length,freq,level,type){
    //try {
        const t0 = audioctx.currentTime
        let osc = new OscillatorNode(audioctx);
        let gain = new GainNode(audioctx);
        osc.frequency.value = freq;
        osc.type = type
        gain.gain.value = level
        osc.connect(gain).connect(audioctx.destination);
        osc.start(t0+start);
        osc.stop(t0+start+length);
    //} catch (error) {
        
    //}
}

function sinwave(start,length,freq,level){
    oscwave(start,length,freq,level,"Sine")
}

function sqrwave(start,length,freq,level){
    oscwave(start,length,freq,level,"Square")
}

function sawwave(start,length,freq,level){
    oscwave(start,length,freq,level,"sawtooth")
}

function triwave(start,length,freq,level){
    oscwave(start,length,freq,level,"Triangle")
}



//サンプルロード
function LoadSample(url) {
    return new Promise((resolv)=>{
        fetch(url).then((response)=>{
            return response.arrayBuffer();
        }).then((arraybuf)=>{
            return audioctx.decodeAudioData(arraybuf);
        }).then((buf)=>{
            resolv(buf);
        })
    });
}



//サンプルを再生
function playsample(sound,start,stop,playbackRate,detune,loop,loopStart,loopEnd){
    try {
        var src = new AudioBufferSourceNode(audioctx)
        const t0 = audioctx.currentTime
        src.buffer = sound
        src.detune.value = detune
        src.loop = loop
        src.loopStart = loopStart
        src.loopEnd = loopEnd
        src.playbackRate.value = playbackRate
        //filt = new BiquadFilterNode(audioctx,{frequency:5000, q:5})
        //src.connect(filt).connect(audioctx.destination);
        src.connect(audioctx.destination);
        src.start(t0+start)
        src.stop(t0+start+stop)
    } catch (error) {
        
    }
}

function oneshot_playsample(sound,start,stop,playbackRate,detune,loop,loopStart,loopEnd){
    try {
        let src = new AudioBufferSourceNode(audioctx);
        src.buffer = sound
        src.detune.value = detune
        //src.loop = loop
        //src.loopStart = loopStart
        //src.loopEnd = loopEnd
        src.playbackRate.value = playbackRate
        //filt = new BiquadFilterNode(audioctx,{frequency:5000, q:5})
        //src.connect(filt).connect(audioctx.destination);
        src.connect(audioctx.destination);
        src.start(start)
        src.stop(stop)
    } catch (error) {
        
    }
}


/*　上二つの使用例
window.addEventListener("mousedown",async ()=>{
    sound = await LoadSample("./samples/E808_CL-05.wav");
    playsample(sound,0.0,1,1,0,false,0,0)
}
*/




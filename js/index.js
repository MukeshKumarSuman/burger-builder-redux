import helloWorld from './hello-world';
import addImage from './add-image';
import buttonRender from '../component/button/hello-world-button';
import heading from '../component/heading/heading';
function init() {
    console.log("init called");
    heading.render();
    helloWorld();
    addImage();
    buttonRender.render();
    console.log("init called end");
} 
export default init;

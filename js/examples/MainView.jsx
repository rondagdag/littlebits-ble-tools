// TODO: Styling

function doRequestFullscreen(docEl) {
    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    requestFullScreen.call(docEl);
}

function doCancelFullscreen() {
    var doc = window.document;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    cancelFullScreen.call(doc);
}

const _ControlTypes = {
    "Slider": SliderControlWrapperView,
    "Car": CarControlWrapperView,
};

class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedControlType: null
        };
    }
    render() {
        if (!this.state.selectedControlType ||
            !_ControlTypes[this.state.selectedControlType]) {
            return <div>
                <h1>Select a control type:</h1>
                {Object.keys(_ControlTypes).map(controlType => <button
                    onClick={() => {
                        doRequestFullscreen(document.documentElement);
		        this.setState({selectedControlType: controlType});
		    }}
                >
                    {controlType}
                </button>)}
            </div>;
        }

        return <div>
            <h1>
                Control type: {this.state.selectedControlType}
                <a onClick={() => {
		    doCancelFullscreen();
                    this.setState({selectedControlType: null});
		}}>Back</a>
            </h1>
            {React.createElement(_ControlTypes[this.state.selectedControlType], {}, [])}
        </div>;
    }
}

ReactDOM.render(
    <MainView />,
    document.getElementById('root')
);

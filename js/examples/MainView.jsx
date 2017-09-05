// TODO: Pushstate for navigation

(function() {
const _ControlTypes = {
    "Slider": {
        icon: "slider.png",
        view: SliderControlWrapperView,
    },
    "Car": {
        icon: "car.png",
        view: CarControlWrapperView,
    },
};

function doRequestFullscreen(docEl) {
    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    requestFullScreen.call(docEl);
}

function doCancelFullscreen() {
    var doc = window.document;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    cancelFullScreen.call(doc);
}

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
            return <div style={_styles.mainView}>
                <h1 style={_styles.header}>Select a control type</h1>
                <div style={_styles.buttonRows}>
                    {Object.keys(_ControlTypes).map(controlType => <button
                        onClick={() => {
                            doRequestFullscreen(document.documentElement);
                            this.setState({selectedControlType: controlType});
                        }}
                        style={{
                            ..._styles.controlButton,
                            background: "white url(\"/images/" +
                                _ControlTypes[controlType].icon +
                                "\") no-repeat center"
                        }}
                    >
                        {controlType}
                    </button>)}
                </div>
            </div>;
        }

        return <div style={_styles.mainView}>
            <h1 style={_styles.header}>
                <button
                    onClick={() => {
                        doCancelFullscreen();
                        this.setState({selectedControlType: null});
                    }}
                    style={_styles.backButton}
                >
                    🔙
                </button>
                {this.state.selectedControlType}
            </h1>
            {React.createElement(_ControlTypes[this.state.selectedControlType].view, {}, [])}
        </div>;
    }
}

const _styles = {
    backButton: {
        background: "white",
        border: "1px solid #ccc",
        borderRadius: 5,
        fontSize: "24px",
        margin: "0 16px",
        padding: "6px 12px",
        verticalAlign: "baseline",
    },

    buttonRows: {
        alignItems: "stretch",
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
    },

    controlButton: {
        border: "1px solid #ccc",
        borderRadius: 5,
        fontSize: "24px",
        margin: 16,
        padding: "78px 0 0 0",
        width: "50%",
    },

    header: {
        fontSize: "32px",
        textAlign: "center",
    },

    mainView: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    }
};

ReactDOM.render(
    <MainView />,
    document.getElementById('root')
);

})();

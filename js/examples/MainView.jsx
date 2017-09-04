// TODO: Styling

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
                    onClick={() => this.setState({selectedControlType: controlType})}
                >
                    {controlType}
                </button>)}
            </div>;
        }

        return <div>
            <h1>
                Control type: {this.state.selectedControlType}
                <a onClick={() => this.setState({selectedControlType: null})}>Back</a>
            </h1>
            {React.createElement(_ControlTypes[this.state.selectedControlType], {}, [])}
        </div>;
    }
}

ReactDOM.render(
    <MainView />,
    document.getElementById('root')
);

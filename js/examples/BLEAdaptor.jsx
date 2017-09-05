function BLEAdaptor(WrappedComponent, bleLabel) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                currentValue: null,
            };
        }

        componentDidMount() {
            this._updater = (label, state) => {
                if (label === bleLabel) {
                    this.forceUpdate();
                }
            };
            W30Bit.addConnectionUpdateHandler(this._updater);
        }

        componentWillUnmount() {
            W30Bit.removeConnectionUpdateHandler(this._updater);
        }

        render() {
            let connectionStates = {};
            let connectionActions = {};
            if (this.props.connectionStates) {
                connectionStates = {...this.props.connectionStates};
            }
            if (this.props.connectionActions) {
                connectionActions = {...this.props.connectionActions};
            }
            connectionStates[bleLabel] = {
                ...W30Bit.getConnectionState(bleLabel),
                currentValue: this.state.currentValue
            };
            connectionActions[bleLabel] = {
                connectBit: (defaultValue) => {
                    W30Bit.connectBit(bleLabel, defaultValue);
                    this.setState({currentValue: defaultValue});
                },
                disconnectBit: () => {
                    W30Bit.disconnectBit(bleLabel);
                },
                writeValue: (value) => {
                    W30Bit.writeValue(bleLabel, value);
                    this.setState({currentValue: value});
                },
            };
            return <WrappedComponent
                {...this.props}
                connectionStates={connectionStates}
                connectionActions={connectionActions}
            />;
        }
    };
}

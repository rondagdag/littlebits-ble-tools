window.PairingView = (function() {
class PairingView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLog: false,
        };
    }

    render() {
        const buttonLabel = (this.props.state.state === "Disconnected") ? "Pair..." : "Disconnect";
        let logsView = null;
        let button = null;
        let status = null;

        if (this.state.showLog) {
        	const logs = this.props.state.log.join("\n");
            logsView = <div>
        		<textarea style={{width: "100%", height: 310}} value={logs} />
            </div>
        }

        if (this.props.state.state === "Disconnected") {
            button = <button
                onClick={() => this.props.actions.connectBit(this.props.defaultValue)}
                style={_styles.pairButton}
            >
                Pair...
            </button>;
        } else {
            button = <button
                onClick={() => this.props.actions.disconnectBit()}
                style={_styles.pairButton}
            >
                Disconnect
            </button>;

            if (this.props.state.state === "Connected") {
                const numLights = Math.floor(this.props.state.currentValue / 43);
                status = [
                    <div style={_styles.name}>{this.props.state.name}</div>,
                    <div style={(numLights > 0) ? _styles.light1 : _styles.lightoff} />,
                    <div style={(numLights > 1) ? _styles.light2 : _styles.lightoff} />,
                    <div style={(numLights > 2) ? _styles.light3 : _styles.lightoff} />,
                    <div style={(numLights > 3) ? _styles.light4 : _styles.lightoff} />,
                    <div style={(numLights > 4) ? _styles.light5 : _styles.lightoff} />,
                ];
            } else {
                status = this.props.state.state;
            }
        }

        return <div style={_styles.pairingView}>
            <div style={_styles.label}>{"BLE: " + this.props.label}</div>
            <button
                onClick={() => this.setState({showLog: !this.state.showLog})}
                style={_styles.logsButton}
            >
                ?
            </button>
            {button}
            <div style={_styles.status}>
                {status}
            </div>
            {logsView}
        </div>
    }
}

const _lightStyle = {
    border: "1px solid #b9d0e6",
    borderRadius: 5,
    display: "inline-block",
    height: 10,
    margin: "0 4px 0 0",
    width: 10,
}

const _styles = {
    label: {
        display: "inline-block",
        fontSize: "18px",
        padding: 8,
        verticalAlign: "middle",
    },

    lightoff: {
        ..._lightStyle,
        background: "black",
    },

    light1: {
        ..._lightStyle,
        background: "green",
    },
    light2: {
        ..._lightStyle,
        background: "green",
    },
    light3: {
        ..._lightStyle,
        background: "yellow",
    },
    light4: {
        ..._lightStyle,
        background: "red",
    },
    light5: {
        ..._lightStyle,
        background: "red",
    },

    name: {
        display: "inline-block",
        margin: "0 8px",
    },

    logsButton: {
        background: "transparent",
        border: "1px solid #ccc",
        borderRadius: 5,
        color: "#fff",
        display: "inline-block",
        fontSize: "12px",
        margin: "0 8px 0 0",
        padding: "3px 6px",
        verticalAlign: "middle",
    },

    pairButton: {
        background: "white",
        border: "1px solid #ccc",
        borderRadius: 5,
        display: "inline-block",
        fontSize: "18px",
        margin: "0 8px",
        padding: "6px 12px",
        verticalAlign: "middle",
    },

    pairingView: {
        background: "#294b8a",
        borderRadius: 25,
        boxShadow: "rgba(0,0,0,0.4) 3px 3px 6px",
        color: "#fff",
        display: "inline-block",
        margin: "0 16px 16px 0",
        padding: "4px 30px",
    },

    status: {
        color: "#b9d0e6",
        display: "inline-block",
        verticalAlign: "middle",
    },
};

return PairingView;
})();

class PairingView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLog: false,
        };
    }

    render() {
        const buttonLabel = (this.props.state.state === "Disconnected") ? "Pair... (Disconnected)" : ("Pair... " + this.props.state.name + " (" + this.props.state.state + ")");
        let logsView = null;
        if (this.state.showLog) {
        	const logs = this.props.state.log.join("\n");
            logsView = <div>
                <h2>Logs for {this.props.label}:</h2>
        		<textarea style={{width: "100%", height: 310}} value={logs} />
            </div>
        }
        return <div>
            <div>{this.props.label + ":"}</div>
			<button onClick={() => this.props.actions.connectBit(this.props.defaultValue)}>{buttonLabel}</button>
            <button onClick={() => this.setState({showLog: !this.state.showLog})}>...</button>
            {logsView}
        </div>
    }
}

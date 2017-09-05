window.SliderControlView = (function() {
class SliderControlView extends React.Component {
    render() {
        return <div>
            <div style={_styles.pairViewWrapper}>
                <PairingView
                    actions={this.props.connectionActions.Primary}
                    defaultValue={128}
                    state={this.props.connectionStates.Primary}
                    label="Primary"
                />
            </div>

			<input
                type="range"
                min="0"
                max="255"
                value={this.props.connectionStates.Primary.currentValue || 0}
                onChange={(evt) => this.props.connectionActions.Primary.writeValue(evt.target.value)}
            />
        </div>;
    }
}

const _styles = {
    pairViewWrapper: {
        textAlign: "center",
    }
};

return SliderControlView;
})();

const SliderControlWrapperView = BLEAdaptor(SliderControlView, "Primary");

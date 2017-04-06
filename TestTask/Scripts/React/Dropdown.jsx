var Dropdown = React.createClass({
    getInitialState: function() {
       return { 
            modeData: [], 
            lineData: [], 
            stopPointData: [],
            timetableData: [],
            isLineDropdownDisabled: true,
            isStopPointDropdownDisabled: true,
            timetableParams: {}
        };
    },
    loadModeListFromServer: function() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.getModeListUrl, true);
        xhr.onload = function() {
            var data = jsonToArray(xhr.responseText);
            this.setState({ modeData: data });
        }.bind(this);
        xhr.send();
    },
    loadLineListFromServer: function(event) {
        if (event.target.value !== "") {
            this.setState({ isLineDropdownDisabled: true });
            this.setState({ isStopPointDropdownDisabled: true });
            this.setState({ timetableData: [] });
            var xhr = new XMLHttpRequest();
            xhr.open('get', this.props.getLineListUrl + event.target.value, true);
            xhr.onload = function() {
                var data = jsonToArray(xhr.responseText);
                this.setState({ lineData: data });
                if (data.length != 0) {
                    this.setState({ isLineDropdownDisabled: false });
                } else {
                    this.setState({ isLineDropdownDisabled: true });
                }
            }.bind(this);
            xhr.send();
        }
    },
    loadStopPointListFromServer: function(event) {
        this.setState({ timetableParams: { lineId: event.target.value } });
        this.setState({ isStopPointDropdownDisabled: true });
        this.setState({ timetableData: [] });
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.getStopPointListUrl + event.target.value, true);
        xhr.onload = function() {
            var data = jsonToArray(xhr.responseText);
            this.setState({ stopPointData: data });
            if (data.length != 0) {
                this.setState({ isStopPointDropdownDisabled: false });
            } else {
                this.setState({ isStopPointDropdownDisabled: true });
            }
        }.bind(this);
        xhr.send();
    },
    loadTimetableFromServer: function(event) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.getTimetableListUrl + this.state.timetableParams.lineId + "/" + event.target.value, true);
        xhr.onload = function() {
            var data = jsonToArray(xhr.responseText);
            this.setState({ timetableData: data });
        }.bind(this);
        xhr.send();
    },
    componentDidMount: function() {
        this.loadModeListFromServer();
        window.setInterval(this.loadModeListFromServer, this.props.pollInterval);
    },
    getModeOptions: function(array) {
        if (array.length == 0) return;
        return array.map((item) => {
            return <option key={item.ModeName} value={item.ModeName} >{item.ModeName}</option>;
        });
    },
    getLineOptions: function(array) {
        if (array.length == 0) return;
        return array.map((item) => {
            return <option key={item.id} value={item.id} >{item.name}</option>;
        });
    },
    getStopPoints: function(array) {
        if (array.length == 0) return;
        return array.map((item) => {
            return <option key={item.Id} value={item.Id} >{item.CommonName}</option>;
        });
    },
    getTimetable: function(array) {
        if (array.length == 0 || array[6] == null) return;
        return array[6].Routes[0].Schedules.map((item) => {
            return [
                <tr>
                    <td>
                        <b>{item.Name}</b>
                    </td>
                    <td></td>
                </tr>,
                <tr>
                    <td>
                        First
                    </td>
                    <td>
                        {item.FirstJourney.Hour}:{item.FirstJourney.Minute}
                    </td>
                </tr>,
                <tr>
                    <td>
                        Last
                    </td>
                    <td>
                        {item.LastJourney.Hour}:{item.LastJourney.Minute}
                    </td>
                </tr>
            ];
        });
    },
    render: function () {
        var modes = this.getModeOptions(this.state.modeData);
        var lines = this.getLineOptions(this.state.lineData);
        var stopPoints = this.getStopPoints(this.state.stopPointData);
        var timetable = this.getTimetable(this.state.timetableData);

        return (
            <div className="dropdown">
                <div className="row">
                    <div className="mode-dropdown col-md-4">
                        <h3>Select transport mode</h3>
                        <select className="form-control" onChange={this.loadLineListFromServer}>
                            {modes}
                        </select>
                    </div>

                    <div className="line-dropdown col-md-4">
                        <h3>Select line</h3>
                        <select className="form-control" disabled={this.state.isLineDropdownDisabled} onChange={this.loadStopPointListFromServer}>
                            <option value=""></option>
                            {lines}
                        </select>
                    </div>

                    <div className="stop-point-dropdown col-md-4">
                        <h3>Select stop point</h3>
                        <select className="form-control" disabled={this.state.isStopPointDropdownDisabled} onChange={this.loadTimetableFromServer}>
                            {stopPoints}
                        </select>
                    </div>
                </div>
                
                <div className="row">
                    <div className="table-container col-md-12">
                        <h3 className="text-center">Timetable (for some buses, cable cars, dlr, river buses, river tours, trams, tubes)</h3>
                        <table className="table table-striped">
                            <thead></thead>
                            <tbody>
                                {timetable}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
});

function jsonToArray(json) {
    var parsed = JSON.parse(json);
    var arr = [];
    for (var x in parsed) {
        arr.push(parsed[x]);
    }
    return arr;
}

ReactDOM.render(<Dropdown 
        getModeListUrl="/getModeList" 
        getLineListUrl="/getLineList/" 
        getStopPointListUrl="/getStopPointList/"
        getTimetableListUrl="/getTimetableList/"
        pollInterval={1000 * 30} 
    />,
    document.getElementById("react-container")
);
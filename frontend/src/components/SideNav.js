import React from "react";
import { validPattern1, validPattern2, validPattern3 } from "./Regex";

import MaterialTable, { MTableToolbar } from "material-table"

import "./SideNav.css"

class SideNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };

        this.UploadHandle = this.UploadHandle.bind(this);
    }

    readUploadedFile(inputFile) {
        const fileReader = new FileReader();

        return new Promise((resolve, reject) => {
            fileReader.onerror = () => {
                fileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            };

            fileReader.onload = () => {
                resolve(JSON.parse(fileReader.result));
            };
            fileReader.readAsText(inputFile);
        });
    };

    async UploadHandle(event) {
        event.preventDefault();

        if (event.target.files[0] !== undefined) {
            const parsedText = await this.readUploadedFile(event.target.files[0]);

            var data = this.state.data;
            var locationsArray = [];
            for (var i = 0; i < parsedText.aerodromes.length; i++) {
                var descriptionSplit = parsedText.aerodromes[i].description.split(" ");
                var patternType;

                var j;
                for (j = 0; j < descriptionSplit.length; j++) {
                    if (validPattern1.test(descriptionSplit[j])) {
                        patternType = 1;
                        break;
                    } else if (validPattern2.test(descriptionSplit[j])) {
                        patternType = 2;
                        break;
                    } else if (validPattern3.test(descriptionSplit[j])) {
                        patternType = 3;
                        break;
                    }
                }

                var dmsText;
                var lat, lng;
                switch (patternType) {
                    case 1:
                        dmsText = descriptionSplit[j].slice(0, 2) + "° " + descriptionSplit[j].slice(2, 4) + "' " + descriptionSplit[j].slice(4, 6) + '" ' + (descriptionSplit[j].charAt(6) === "N" ? "North" : "South") + " by "
                            + descriptionSplit[j].slice(9, 11) + "° " + descriptionSplit[j].slice(11, 13) + "' " + descriptionSplit[j].slice(13, 15) + '" ' + (descriptionSplit[j].charAt(15) === "W" ? "West" : "East");
                        lat = (parseFloat(descriptionSplit[j].slice(0, 2)) + parseFloat(descriptionSplit[j].slice(2, 4)) / 60 + parseFloat(descriptionSplit[j].slice(4, 6)) / 3600) * (descriptionSplit[j].charAt(6) === "S" ? -1 : 1);
                        lng = (parseFloat(descriptionSplit[j].slice(9, 11)) + parseFloat(descriptionSplit[j].slice(11, 13)) / 60 + parseFloat(descriptionSplit[j].slice(13, 15)) / 3600) * (descriptionSplit[j].charAt(15) === "W" ? -1 : 1);
                        break;
                    case 2:
                    case 3:
                        dmsText = descriptionSplit[j].slice(0, 2) + "° " + descriptionSplit[j].slice(2, 4) + "' " + descriptionSplit[j].slice(4, 6) + "." + descriptionSplit[j].slice(7, 9) + '" ' + (descriptionSplit[j].charAt(9) === "N" ? "North" : "South") + " by "
                            + descriptionSplit[j].slice(12, 14) + "° " + descriptionSplit[j].slice(14, 16) + "' " + descriptionSplit[j].slice(16, 18) + "." + descriptionSplit[j].slice(19, 21) + '" ' + (descriptionSplit[j].charAt(21) === "W" ? "West" : "East");
                        lat = (parseFloat(descriptionSplit[j].slice(0, 2)) + parseFloat(descriptionSplit[j].slice(2, 4)) / 60 + parseFloat(descriptionSplit[j].slice(4, 6) + "." + descriptionSplit[j].slice(7, 9)) / 3600) * (descriptionSplit[j].charAt(9) === "S" ? -1 : 1);
                        lng = (parseFloat(descriptionSplit[j].slice(12, 14)) + parseFloat(descriptionSplit[j].slice(14, 16)) / 60 + parseFloat(descriptionSplit[j].slice(16, 18) + "." + descriptionSplit[j].slice(19, 21)) / 3600) * (descriptionSplit[j].charAt(21) === "W" ? -1 : 1);
                        break;
                    default:
                        console.log("No valid pattern");
                        break;
                }

                data.push({ name: parsedText.aerodromes[i].name, city: parsedText.aerodromes[i].city, dms: dmsText, createdAt: parsedText.aerodromes[i].created_at, runwaysQtd: parsedText.aerodromes[i].runways.length });
                locationsArray.push({ name: parsedText.aerodromes[i].name, lat: lat, lng: lng, runwaysQtd: parsedText.aerodromes[i].runways.length });
            }

            if (data.length > 0) {
                this.setState({ data: data });
                this.props.setLocationsArray(locationsArray);
            }
        }
    };

    render() {
        return (
            <div className="sideNav" >
                <h3>{this.props.user}</h3>

                <label className="uploadLabel" htmlFor="file">Upload</label>
                <input id="file" type="file" className="upload" name="Upload" onChange={this.UploadHandle} accept=".txt" />

                {this.state.data.length !== 0 &&
                    <MaterialTable
                        className="table"
                        title=""
                        columns={[
                            {
                                title: "Nome", field: "name"
                            },
                            {
                                title: "Cidade", field: "city"
                            },
                            {
                                title: "DMS", field: "dms"
                            },
                            {
                                title: "Data de criação", field: "createdAt"
                            },
                            {
                                title: "Quantidade de pistas", field: "runwaysQtd"
                            },
                        ]}
                        data={this.state.data}
                        options={{
                            cellStyle: {
                                fontSize: 10,
                            },
                            toolbar: false,
                            sorting: false,
                            paging: false,
                            //pageSize: this.state.currentData.length,       // make initial page size
                            emptyRowsWhenPaging: true,   //to make page size fix in case of less data rows
                            //pageSizeOptions: [5, 10, 20, 50, this.state.currentData.length],    // rows selection options
                            rowStyle: {
                                borderBottom: "2px solid black",
                                borderTop: "2px solid black"
                            },
                            headerStyle: {
                                borderBottom: "2px solid black",
                                borderTop: "2px solid black",
                                fontSize: "13px"
                            },
                            tableLayout: "fixed"
                        }}
                        localization={{
                            body: {
                                emptyDataSourceMessage: 'Nenhum registro para exibir'
                            },
                            pagination: {
                                labelRowsSelect: 'linhas',
                                labelDisplayedRows: '{count} de {from}-{to}',
                                firstTooltip: 'Primeira página',
                                previousTooltip: 'Página anterior',
                                nextTooltip: 'Próxima página',
                                lastTooltip: 'Última página'
                            },
                        }}
                    />
                }
            </div>
        );
    }
};

export default SideNav
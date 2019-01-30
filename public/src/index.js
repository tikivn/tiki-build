import React, { Component } from "react";
import { render } from "react-dom";
import compareVersions from 'compare-versions';
import { parseSemVer } from 'semver-parser';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      android: [],
      ios: []
    };
  }

  componentDidMount() {
    fetch("https://aws-api.tiki.vn/apps")
      .then(response => response.json())
      .then(responseJson => {
        console.log(compareVersions);
        const mapping = (builds, iOS) =>
          builds
            .map(build => build.versions
              .reverse()
            )
            .reduce((acc, value) => [...acc, ...value]);

        const android = mapping(responseJson["android"]);
        const ios = mapping(responseJson["ios"]).map(build =>
          Object.assign({}, build, {
            link: "itms-services://?action=download-manifest&url=" + build.link
          })
        );
        this.setState({ loading: false, android: android, ios: ios });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { loading, android, ios } = this.state;
    if (loading) {
      return <h1>Loading...</h1>;
    }

    const renderPlatformBuilds = (name, builds) => (
      <div>
        <h1>{name}</h1>
        <ul>
          {builds.map((item, index) => (
            <li key={index}>
              <div>
                <a href={item.link}>
                  {item.name} - {item.version}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
    return (
      <div>
        {renderPlatformBuilds("android", android)}
        {renderPlatformBuilds("ios", ios)}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));

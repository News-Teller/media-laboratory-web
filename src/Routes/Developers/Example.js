import React from "react";
import { NavLink } from "react-router-dom";
import { CopyBlock, solarizedLight } from "react-code-blocks";
import ExampleImg from "./guidelines-cards-example.png";

const codes = [
  // ---
  `df = pd.DataFrame({
  "Source": [
      "Agriculture", "Déchets", "Energie (centrales électriques)", "Industrie (combustion)",
      "Industrie (procédés)", "Transports", "Résidentiel", "Tertiaire"
  ],
  "Amount": [9, 1, 11, 26, 16, 19, 14, 4],
})
fig = px.pie(df, values="Amount", names="Source", color_discrete_sequence=px.colors.sequential.RdBu)`,
  // ---
  `def get_popover_element(text: str, card_id: str) -> html:
    """Construct a <i> tag to trigger a popover. """
    data_attrs = {
        "data-toggle": "popovercard",
        "data-card-id": card_id,
    }
    return html.I(text, **data_attrs)

header = html.Div(children=[
  html.H1("Guidelines cards example"),
  html.H2(children=[
      "Emissions de ",
      get_popover_element("gaz à effet de serre", card_id="30")
  ]),
])

footer = html.Div(children=[
    get_popover_element("Le CO2", card_id="54"),
    """
    qui représente 86 % des émissions totales de gaz à effet de serre,
    est principalement émis lors des processus de combustion:
    industrie, transports, chauffage résidentiel, industries de production d’électricité et tertiaire.
    """
])`,
  // ---
  `layout = html.Div(children=[
  header,
  dcc.Graph(figure=fig),
  footer,
  empty_divs,   # utility block, see below
], className="wrapper")`,
  // ---
  `UID = "9d61311fd159"

app = JupyterDash(
    title='Guidelines cards example',
    assets_folder=os.getenv("ASSETS_FOLDER", "") + "/" + UID,
    external_scripts=[
        'https://unpkg.com/@popperjs/core@2',
        'https://news-teller.github.io/media-laboratory-web/popovers.js',
    ]
)
app.layout = layout`,
  // ---
  `empty_divs = html.Div(children=[
  html.Div(id='blank-input'),
  html.Div(id='blank-output')
], className="clientside-io")

app.clientside_callback(
  """
  function() {
      const showCards = window['reloadPopoversjsElements'];
      if (showCards) showCards();
  }
  """,
  Output('blank-output', 'children'),
  Input('blank-input', 'children'),
)`,
  // ---
  `html, body {
  font-family: "Open Sans", sans-serif;
  color: #212121;
  -moz-osx-font-smoothing: grayscale;
}
.wrapper {
  width: 50%;
  margin: 0 auto
}
h1, h2 {
  margin-top: 0;
  margin-bottom: .5rem;
  font-weight: 500;
  line-height: 1.2;
}
h1 {
  font-size: 2.5rem;
}
h2 {
  font-size: 1.8rem;
}
[data-toggle] {
  color: #17a2b8;
}
.clientside-io {
  display: none;
}`,
  // ---
  `JupyterDash.infer_jupyter_proxy_config()
app.run_server(mode="external")`,
  // ---
  `dz = dataviz.DataViz()
dz.store(
    uid=UID,
    title=app.title,
    dash_app=app,
    tags=['notebook', 'demo']   # tags are optional
)`,
  // ---
];

export default function Example() {
  const defaultCodeProps = {
    language: "python",
    showLineNumbers: false,
    theme: solarizedLight,
    customStyle: { fontSize: "smaller" },
    codeBlock: true,
  };

  const InlineCode = ({ children }) => {
    return <code className="bg-gray-200">{children}</code>;
  };

  const codesIterator = codes[Symbol.iterator]();

  return (
    <>
      <div>
        <h3>Guidelines cards example</h3>
        <div className="paragraph">
          Here is an example to help you get started with Media Laboratory
          visualizations, which also makes use of the{" "}
          <NavLink to="/guidelines">Guideline cards</NavLink>.<br />
          The center element of our visualization will be a pie chart, so let's
          create that first.
        </div>
      </div>

      <div className="my-6 mx-auto w-10/12">
        <CopyBlock {...defaultCodeProps} text={codesIterator.next().value} />
      </div>

      <div>
        <div className="paragraph">
          The Media Laboratory environment allows you to share your
          visualizations, which are basically{" "}
          <a href="https://dash.plotly.com" rel="noreferrer">
            Dash applications
          </a>
          . First, we describe what the application looks like by defining the
          application{" "}
          <a href="https://dash.plotly.com/layout" rel="noreferrer">
            layout
          </a>
          . In our case, it is composed of three main part: a <i>header</i>,
          which consist of a title and a subtitle, the pie chart created above
          and a <i>footer</i> with some text. <br />
          In both the <i>header</i> and the <i>footer</i> will place an element
          to trigger the <NavLink to="/guidelines">Guidelines cards</NavLink>.
        </div>

        <div className="paragraph">
          After the <i>footer</i> will also add an <i>utility</i>{" "}
          <InlineCode>div</InlineCode> block, which will have no appearance but
          it'll help building a{" "}
          <a
            href="https://dash.plotly.com/clientside-callbacks"
            rel="noreferrer"
          >
            clientside callback
          </a>
          . We'll see that later. <br />
        </div>
      </div>

      <div className="my-6 mx-auto w-10/12">
        <CopyBlock {...defaultCodeProps} text={codesIterator.next().value} />
      </div>

      <div>
        <div className="paragraph">
          We use the <InlineCode>get_popover_element</InlineCode> function to
          build the trigger elements for the Guidelines Cards. See the{" "}
          <NavLink to="/guidelines">Guidelines page</NavLink> for more details
          on this. <br />
          We can now build the application layout.
        </div>
      </div>

      <div className="my-6 mx-auto w-10/12">
        <CopyBlock {...defaultCodeProps} text={codesIterator.next().value} />
      </div>

      <div>
        <div>
          After this, we need to create the Dash application object and add the
          layout defined above.
        </div>
      </div>

      <div className="my-6 mx-auto w-10/12">
        <CopyBlock {...defaultCodeProps} text={codesIterator.next().value} />
      </div>

      <div>
        <div>
          The <InlineCode>assets_folder</InlineCode> is required to include
          local style sheet files, while the{" "}
          <InlineCode>external_scripts</InlineCode> are for the Guidelines
          Cards.
        </div>
        <div className="paragraph">
          The last piece of the application is a small Javascript function
          needed to reload the Guidelines Cards once the layout is fully loaded
          on the webpage. To achieve this will use Dash's{" "}
          <a
            href="https://dash.plotly.com/clientside-callbacks"
            rel="noreferrer"
          >
            clientside callback
          </a>
          .
        </div>
      </div>

      <div className="my-6 mx-auto w-10/12">
        <CopyBlock {...defaultCodeProps} text={codesIterator.next().value} />
      </div>

      <div>
        <div>
          Now the application is finished. We can apply the following styles to
          make it look nicer. Copy the following code to a file named{" "}
          <InlineCode>style.css</InlineCode> under{" "}
          <InlineCode>medialab-assets/9d61311fd159/</InlineCode> (note the{" "}
          <InlineCode>UID</InlineCode> value in the path).
        </div>
      </div>

      <div className="my-6 mx-auto w-10/12">
        <CopyBlock
          {...defaultCodeProps}
          language="css"
          text={codesIterator.next().value}
        />
      </div>

      <div>
        <div>
          Before going to the next step and store our app, let's run it and see
          the results.
        </div>
      </div>

      <div className="my-6 mx-auto w-10/12">
        <CopyBlock
          {...defaultCodeProps}
          language="css"
          text={codesIterator.next().value}
        />
      </div>

      <div>
        <a
          href="https://embed.newsteller.io/9d61311fd159"
          title="Guidelines cards example"
          rel="noreferrer"
        >
          <img
            src={ExampleImg}
            alt="Guidelines cards example"
            title="Guidelines cards example"
          />
        </a>
      </div>

      <div>
        <div>
          To keep this application available anytime and be able to share it
          with someone we make use of the{" "}
          <a
            href="https://github.com/News-Teller/media-laboratory/blob/main/docs/dataviz.md"
            rel="noreferrer"
          >
            DataViz
          </a>{" "}
          python package and call the <InlineCode>store</InlineCode> method.
        </div>
      </div>

      <div className="my-6 mx-auto w-10/12">
        <CopyBlock
          {...defaultCodeProps}
          language="css"
          text={codesIterator.next().value}
        />
      </div>

      <div>
        <div>
          Now your Dash application is available at{" "}
          <InlineCode>http://localhost:8080/9d61311fd159</InlineCode>, or{" "}
          <InlineCode>
            https://&lt;embed.your_domain.com&gt;/9d61311fd159
          </InlineCode>
            if you have set the secure environment with your own domain.
          <br />
        </div>
        <div>
          You can find the full code of this example on the{" "}
          <a
            href="https://github.com/News-Teller/media-laboratory/tree/main/examples"
            rel="noreferrer"
          >
            GitHub repository
          </a>
          .
        </div>
      </div>
    </>
  );
}

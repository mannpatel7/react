const heading = React.createElement(
    "h1", 
    { id: "heading" },
    "Hello World from react");

    console.log(heading);// object

const root = ReactDOM.createRoot(document.querySelector(".root"));

root.render(heading);

{/* <div id="Parent">
<div>
    <h1>I m H1</h1>
    <h2>I m H2</h2>
</div>


</div> */}

const parent=React.createElement("div",{id:"parent"},
    React.createElement("div",{id:"child"},
        [React.createElement("h1",{id:"heading"},"I am Here!"),React.createElement("h2",{id:"heading1"},"I am here too!")]
    ));


root.render(parent);//replace not append


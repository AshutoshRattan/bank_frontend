import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "15% auto",
};
let [loading, setLoading] = useState('true');

setLoading(true)
setLoading(false)

    < ClipLoader
color = "#36d7b7"
loading = { loading }
cssOverride = { override }
size = { 150}
    /> 
function RecommendationActions({

    onPredict,

    onClear,

}) {

    return (

        <div

            style={{

                marginTop: "20px",

                display: "flex",

                gap: "10px",

            }}

        >

            <button

                className="btn-primary"

                onClick={onPredict}

            >

                🌾 Get Recommendation

            </button>

            <button

                className="btn-secondary"

                onClick={onClear}

            >

                Clear Form

            </button>

        </div>

    );

}

export default RecommendationActions;
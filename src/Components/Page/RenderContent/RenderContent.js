function RenderContent({ content }) {
    return (
        <div>
            {content.map((values, idx) => {
                return (
                    <div key={idx}>
                        {
                            values.type === 1 ?
                                <h1>{values.value}</h1> :
                                values.type === 2 ?
                                    <h2>{values.value}</h2> :
                                    values.type === 3 ?
                                        <p>{values.value}</p> :
                                        <img src={values.value} alt='img-content' />

                        }
                    </div>
                );
            })}
        </div>
    );
}

export default RenderContent;
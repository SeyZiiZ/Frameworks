export const WordContainer = ({ words = [] , start, limit, isSyntaxeCorrect}) => {
    return (
        <div className=" min-h-1 flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
                <section className="text-center">
                    <h2 className="text-2xl font-bold mb-6">Typing Speed Test</h2>
                    <div className="flex flex-wrap justify-center gap-3 bg-gray-50 p-4 rounded-lg">
                        {words.length > 0 ? (
                            words.slice(start, limit).map((word, index) => (
                                <span 
                                    key={index} 
                                    className={`px-3 py-1 rounded-md text-lg font-medium ${
                                        index === 0 && isSyntaxeCorrect 
                                        ? 'bg-blue-100 text-blue-800'
                                        : index === 0
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-blue-100 text-blue-800'
                                    }`}
                                >
                                    {word}
                                </span>
                            ))
                        ) : (
                            <p className="text-gray-500">Aucun mot à afficher</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};
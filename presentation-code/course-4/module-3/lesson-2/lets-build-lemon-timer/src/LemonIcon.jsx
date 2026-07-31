import React from "react";

export default function LemonIcon({blinking}) {
    const [solid, setSolid] = React.useState(true);
    React.useEffect(() => {
        if(blinking) {
            const id = setInterval(() => {
                setSolid((s) => !s);
            }, 500);

            return () => clearInterval(id);
        }
    }, [blinking]);

    return <span className="lemon" style={{opacity: (solid ? 1 : 0.2 )}}>🍋</span>
}
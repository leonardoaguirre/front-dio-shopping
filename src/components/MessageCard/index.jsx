import React from "react"

const MessageCard = ({ content }) => {
    return (
        <div className="card mt-2" key={content.id}>
            <div className="card-body">
                <h5 className="card-title">{content.email}</h5>
                <p className="card-text">{content.message}</p>
                <p className="card-text">
                    <small className="text-muted">
                        {new Date(content.created_at).toLocaleDateString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </small>
                </p>
            </div>
        </div>
    )
}

export { MessageCard }
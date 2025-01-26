import React from "react";
import { Badge, Card } from "react-bootstrap";

const TypeBadge = ({ type }) => {
    const typeVariants = {
        MCQ: "primary",
        ANAGRAM: "success",
        READ_ALONG: "warning",
        CONTENT_ONLY: "secondary",
        CONVERSATION: "info",
    };

    return (
        <Badge bg={typeVariants[type] || "secondary"} className="py-1 px-2">
            {type}
        </Badge>
    );
};

const QuestionList = ({ questions }) => {
    if (questions.length === 0) {
        return (
            <Card className="text-center border-0 shadow-sm">
                <Card.Body>
                    <p className="text-muted mb-0">
                        No questions found. Try a different search or filter.
                    </p>
                </Card.Body>
            </Card>
        );
    }

    return (
        <div className="space-y-3">
            {questions.map((question) => (
                <Card
                    key={question.id}
                    className="mb-3 shadow-sm hover-lift"
                    style={{
                        border: "none",
                        borderRadius: "12px",
                        backgroundColor: "#f5f5f5",
                    }}
                >
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <Card.Title className="h5 text-primary">
                                {question.title}
                            </Card.Title>
                            <TypeBadge type={question.type} />
                        </div>

                        {question.solution && (
                            <Card.Text className="text-muted small">
                                {question.solution}
                            </Card.Text>
                        )}
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default QuestionList;

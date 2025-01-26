import React, { useState, useEffect } from "react";
import { Dropdown, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Filter } from "lucide-react";
import SearchBox from "./components/SearchBox";
import QuestionList from "./components/QuestionList";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import { SearchRequest } from "./question_pb";
import { QuestionServiceClient } from "./question_grpc_web_pb";

const client = new QuestionServiceClient("http://localhost:8080", null, null);

const searchQuestions = (query, page, callback) => {
    const request = new SearchRequest();
    request.setQuery(query);
    client.searchQuestions(request, {}, (err, response) => {
        if (err) {
            console.error(err);
        } else {
            callback(response);
        }
    });
};

const searchQuestionsFromGrpc = (query, page, callback) => {
    searchQuestions(query, page, (response) => {
        const questions = response.getQuestionsList().map((question) => ({
            id: question.getId(),
            title: question.getTitle(),
            type: question.getType(),
            solution: question.getSolution(),
        }));

        callback(questions);
    });
};

const App = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState("ALL_TYPES");

    useEffect(() => {
        const fetchQuestions = () => {
            if (searchQuery) {
                setLoading(true);
                searchQuestionsFromGrpc(
                    searchQuery,
                    currentPage,
                    (questions) => {
                        const filteredQuestions =
                            filterType === "ALL_TYPES"
                                ? questions
                                : questions.filter(
                                      (q) => q.type === filterType
                                  );

                        const pageSize = 10;
                        const totalPages = Math.ceil(
                            filteredQuestions.length / pageSize
                        );
                        const paginatedQuestions = filteredQuestions.slice(
                            (currentPage - 1) * pageSize,
                            currentPage * pageSize
                        );

                        setQuestions(paginatedQuestions);
                        setTotalPages(totalPages);
                        setLoading(false);
                    }
                );
            }
        };
        fetchQuestions();
    }, [searchQuery, currentPage, filterType]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filterType]);

    return (
        <Container fluid className="min-vh-100 bg-light py-5">
            <Container>
                <Card className="shadow-lg">
                    <Card.Header className="bg-primary text-white text-center py-3">
                        <h1 className="display-6 mb-0">QuestSearch</h1>
                    </Card.Header>
                    <Card.Body>
                        <Row className="mb-4">
                            <Col xs={12} md={4} className="mb-3 mb-md-0">
                                <div className="d-flex align-items-center">
                                    <Filter className="text-primary me-2" />
                                    <Dropdown
                                        onSelect={(eventKey) =>
                                            setFilterType(eventKey)
                                        }
                                    >
                                        <Dropdown.Toggle variant="outline-primary">
                                            {filterType === "ALL_TYPES"
                                                ? "All Types"
                                                : filterType}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="ALL_TYPES">
                                                All Types
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="ANAGRAM">
                                                Anagram
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="MCQ">
                                                MCQ
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="READ_ALONG">
                                                Read Along
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="CONTENT_ONLY">
                                                Content Only
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="CONVERSATION">
                                                Conversation
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                            <Col xs={12} md={8}>
                                <SearchBox
                                    setSearchQuery={setSearchQuery}
                                    setCurrentPage={setCurrentPage}
                                />
                            </Col>
                        </Row>

                        {loading ? (
                            <Loader />
                        ) : (
                            <>
                                <QuestionList questions={questions} />
                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    onPageChange={setCurrentPage}
                                />
                            </>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </Container>
    );
};

export default App;

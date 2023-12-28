import React from "react";
import { Link } from "react-router-dom";
import heroImg from "./img/hero1.svg";

import { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FiChevronsRight, FiChevronsLeft } from "react-icons/fi";
import TableHeader from "./components/TableHeader";


const Home = () => {
  const [messages, setMessages] = useState([]);

  const [sortOrder, setSortOrder] = useState({ column: "id", direction: "asc" });

  const [messagesPerPage] = useState(5);
  const MESSAGES_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalMessages = messages.length;
  const startIndex = (currentPage - 1) * MESSAGES_PER_PAGE;
  // const endIndex = startIndex + MESSAGES_PER_PAGE;
  const endIndex = Math.min(startIndex + MESSAGES_PER_PAGE, totalMessages);
  const totalPages = Math.ceil(totalMessages / MESSAGES_PER_PAGE);

  const displayedMessages = messages.slice(startIndex, endIndex);

  useEffect(() => {
    fetch("http://localhost:4001/messages")
      .then((response) => response.json())
      .then((data) => setMessages(data.reverse()));
  }, []);



  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(messages.length / messagesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePreviousPageClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPageClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const sortTable = (columnName) => {
    let direction = "asc";
    if (sortOrder.column === columnName && sortOrder.direction === "asc") {
      direction = "desc";
    }
    setSortOrder({ column: columnName, direction: direction });
  };

  const sortedMessages = messages.sort((a, b) => {
    if (!sortOrder.column) {
      return 0;
    }
    let comparison = 0;
    if (a[sortOrder.column] > b[sortOrder.column]) {
      comparison = 1;
    } else if (a[sortOrder.column] < b[sortOrder.column]) {
      comparison = -1;
    }
    return sortOrder.direction === "desc" ? comparison * -1 : comparison;
  });

  return (
    <div className='container'>
      <div className='hero-section'>
        <img src={heroImg} alt='Hero' width='500' />
        <Link to='/form' className='btn btn-primary btn-lg'>
          Sign the Guestbook
        </Link>
      </div>

      <h1>Guestbook</h1>
      <hr></hr>
      <div>
        <div className='guestbook'>
          <table>
            <thead>
              <tr>
                <td colspan='4'>
                  <button disabled={currentPage === 1} onClick={() => handlePreviousPageClick()} type='button' title={currentPage === 1 ? "" : "Go to previous page"}>
                    <FiChevronsLeft />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? "current-page" : ""} disabled={currentPage === i + 1}>
                      {i + 1}
                    </button>
                  ))}
                  <button disabled={currentPage === totalPages} onClick={() => handleNextPageClick()} type='button' title={currentPage === totalPages ? "" : "Go to next page"}>
                    <FiChevronsRight />
                  </button>
                </td>
              </tr>
              <tr>
                <TableHeader columnName='id' columnDisplayName='#' sortOrder={sortOrder} sortTable={sortTable} />
                <TableHeader columnName='datetime' columnDisplayName='Posted on' sortOrder={sortOrder} sortTable={sortTable} />
                <TableHeader columnName='name' columnDisplayName='Name' sortOrder={sortOrder} sortTable={sortTable} />
                <TableHeader columnName='message' columnDisplayName='Message' sortOrder={sortOrder} sortTable={sortTable} />
              </tr>
            </thead>
            <tbody data-test-id="GuestBookEnrtriesContainer">
              {displayedMessages.map((entry) => (
                <tr id={entry.id} key={entry.id}>
                  <td>{entry.id}</td>
                  <td>{new Date(entry.datetime).toLocaleString("en-US", { month: "long", day: "2-digit", year: "numeric", hour: "numeric", minute: "numeric", hour12: true })}</td>
                  <td className='nowrap'>{entry.name}</td>
                  <td>{entry.message}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan='4'>
                  <button disabled={currentPage === 1} onClick={() => handlePreviousPageClick()} type='button' title={currentPage === 1 ? "" : "Go to previous page"}>
                    <FaAngleLeft />
                  </button>
                  {startIndex + 1}-{endIndex} of {totalMessages}
                  <button disabled={currentPage === totalPages} onClick={() => handleNextPageClick()} type='button' title={currentPage === totalPages ? "" : "Go to next page"}>
                    <FaAngleRight />
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default Home;

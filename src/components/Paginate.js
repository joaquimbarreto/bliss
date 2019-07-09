import React from "react";

const Paginate = ({
  nextQuestions,
  previousQuestions,
  handleClick,
  numOfQuestions,
  activePage
}) => {
  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(numOfQuestions / 10); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="pagination">
        <li key="less" onClick={previousQuestions}>
          <a href="!#">&lt;</a>
        </li>

        {pageNumbers.map(number => {
          return (
            <li
              key={number}
              className={activePage === number ? "active" : null}
              onClick={() => handleClick(number)}
            >
              <a href="!#">{number}</a>
            </li>
          );
        })}

        <li key="more" onClick={nextQuestions}>
          <a href="!#">&gt;</a>
        </li>
      </ul>
    </div>
  );
};

export default Paginate;

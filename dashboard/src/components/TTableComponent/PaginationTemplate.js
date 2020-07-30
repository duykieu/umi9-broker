import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import uniqueId from "uniqid";

const PaginationItem = ({ label, disabled, onClick }) => {
  return (
    <li className={`page-item ${disabled && "disabled"}`}>
      <button onClick={onClick} className="page-link" href="#">
        {label}
      </button>
    </li>
  );
};

const PaginationTemplate = ({ pageCount, currentPage, adjacents, gotoPage }) => {
  let paginationItems = [];

  //Ta cần tất cả [1][2][...][85][86][87][...][501][502]
  //Nếu adjacents = 3 thì ta cần ít nhất 11 chỗ để render chuẩn một bộ
  //Trong trường hợp nhỏ hơn 11 trang thì render tất cả
  //Nếu không đủ chỗ thì render hết
  if (pageCount < 7 + adjacents * 2) {
    paginationItems = [];
    for (let counter = 1; counter <= pageCount; counter++) {
      paginationItems.push(
        <PaginationItem
          onClick={() => {
            gotoPage(counter);
          }}
          key={uniqueId()}
          label={counter}
          disabled={currentPage === counter}
        />
      );
    }
  } else if (pageCount > 5 + adjacents * 2) {
    //Ví dụ trang hiện tại nhỏ hơn 6 thì chỉ hide phần cuối
    //[1][2][3][4][5][6][...][501][502]
    if (currentPage < 1 + adjacents * 2) {
      paginationItems = [];
      for (let counter = 1; counter < 4 + adjacents * 2; counter++) {
        paginationItems.push(
          <PaginationItem
            onClick={() => {
              gotoPage(counter);
            }}
            key={uniqueId()}
            label={counter}
            disabled={currentPage === counter}
          />
        );
      }

      paginationItems.push(
        <PaginationItem key={uniqueId()} label={"..."} disabled />,
        <PaginationItem
          key={uniqueId()}
          onClick={() => {
            gotoPage(pageCount - 1);
          }}
          label={pageCount - 1}
        />,
        <PaginationItem
          key={uniqueId()}
          onClick={() => {
            gotoPage(pageCount);
          }}
          label={pageCount}
        />
      );
      //in middle; hide some front and some back
      //[1][2][...][6][7][8][...][12][13]
    } else if (pageCount - adjacents * 2 > currentPage && currentPage > adjacents * 2) {
      paginationItems = [];

      paginationItems.push(
        <PaginationItem
          key={uniqueId()}
          label={1}
          onClick={() => {
            gotoPage(1);
          }}
        />,
        <PaginationItem
          key={uniqueId()}
          label={2}
          onClick={() => {
            gotoPage(2);
          }}
        />,
        <PaginationItem key={uniqueId()} label={"..."} disabled />
      );
      for (
        let counter = currentPage - adjacents;
        counter <= currentPage + adjacents;
        counter++
      ) {
        paginationItems.push(
          <PaginationItem
            key={uniqueId()}
            label={counter}
            onClick={() => {
              gotoPage(counter);
            }}
            disabled={counter === currentPage}
          />
        );
      }

      paginationItems.push(
        <PaginationItem key={uniqueId()} label={"..."} disabled />,
        <PaginationItem
          key={uniqueId()}
          label={pageCount - 1}
          onClick={() => {
            gotoPage(pageCount - 1);
          }}
        />,
        <PaginationItem
          key={uniqueId()}
          label={pageCount}
          onClick={() => {
            gotoPage(pageCount);
          }}
        />
      );
    } else {
      paginationItems = [];
      paginationItems.push(
        <PaginationItem
          key={uniqueId()}
          label={1}
          onClick={() => {
            gotoPage(1);
          }}
        />,
        <PaginationItem
          key={uniqueId()}
          label={2}
          onClick={() => {
            gotoPage(2);
          }}
        />,
        <PaginationItem key={uniqueId()} label={"..."} disabled />
      );

      for (
        let counter = pageCount - (2 + adjacents * 2);
        counter <= pageCount;
        counter++
      ) {
        paginationItems.push(
          <PaginationItem
            key={uniqueId()}
            label={counter}
            disabled={counter === currentPage}
            onClick={() => {
              gotoPage(counter);
            }}
          />
        );
      }
    }
  }
  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
          <button className="page-link" onClick={() => gotoPage(currentPage - 1)}>
            <LeftOutlined className="icon" />
          </button>
        </li>

        {paginationItems}
        <li className={`page-item ${currentPage === pageCount && "disabled"}`}>
          <button className="page-link" onClick={() => gotoPage(currentPage + 1)}>
            <RightOutlined />
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default PaginationTemplate;

'use client';

import Image from 'next/image';
import styles from './page.module.css';
import Logo from '../public/logo.png';
// import { getUsers } from '../lib/db';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [loadingBsc, setLoadingBsc] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch('/api/user');
      const data = await response.json();
      setUsers(data);
    };
    getUsers();
  }, []);
  const getBalance = async (e: any) => {
    try {
      setLoadingBsc(true);
      const address = e.target.value;
      const response = await fetch(
        `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0xfb1b29e497bce8b268e488d2d6d3db8df286777e&address=${address}&tag=latest&apikey=FBP7SRW1MV8AJFDQDHKYWGFE4STH23BCU1`
      );
      const data = await response.json();
      const balance = data.result / 1000000000000000000;
      if (!address) throw new Error('Address is required');
      if (!data.result) throw new Error('Address is not valid');
      setLoadingBsc(false);
      if (balance > 1) {
        await fetch('/api/user/save', {
          method: 'POST',
          body: JSON.stringify({
            address,
            ammount: data.result,
            ticketid: uuidv4(),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (res.status === 200) {
            alert('You have been registered successfully');
          } else {
            alert('User already registered');
          }
          console.log(res);
        });
      } else {
        alert(
          'You have less than 1 billion tokens, you are not eligible to participate in the draw.'
        );
      }
    } catch ({ message }: any) {
      alert(message);
    }
  };
  return (
    <main className={styles.main}>
      <div className="container-fluid bootstrap snippets bootdey">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-md-12">
              <div className="widget-box">
                <div className="widget-body">
                  <div className="text-center">
                    <Image
                      src={Logo}
                      width={200}
                      height={200}
                      alt={''}
                    />
                  </div>
                  <h5
                    className="widget-caption themesecondary"
                    style={{
                      color: '#fff !important',
                      fontSize: '20px',
                      textAlign: 'center',
                      padding: '15px',
                    }}>
                    We are offering $10 dollars to holders with more than one
                    billion tokens. The winning ticket will receive $10 dollars.
                    Simply enter your wallet in the field below to receive your
                    ticket ID. We will increase the prize as we are testing the
                    platform. The draw will take place on 10/06 at 23:00 UTC.
                  </h5>
                  <div className="widget-main no-padding">
                    <div style={{ paddingTop: '20px' }}>
                      <form role="form">
                        <div className="d-flex align-items-center">
                          <div className="form-group w-100 ">
                            <div className="form-floating mb-0">
                              <input
                                type="email"
                                className="form-control"
                                id="floatingInput"
                                placeholder="Paste your wallet address"
                                onBlur={getBalance}
                              />
                              <label htmlFor="floatingInput">
                                Paste your wallet address
                              </label>
                            </div>
                          </div>
                          {loadingBsc && (
                            <div
                              className="spinner-border text-light ms-2"
                              role="status">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                    <div className="tickets-container mt-4">
                      <ul className="tickets-list">
                        {users.map((user: any, i: number) => (
                          <li
                            key={i}
                            className="ticket-item">
                            <div className="row">
                              <div className="ticket-user col-md-4 col-sm-12">
                                <strong>Address:</strong>
                                <br />
                                <span className="addddress">
                                  {user.address}
                                </span>
                              </div>
                              <div className="ticket-user col-md-4 col-sm-12">
                                <strong>Total Tokens:</strong>
                                <br />
                                <span>{user.ammount}</span>
                              </div>
                              <div className="ticket-user col-md-4 col-sm-12">
                                <strong>TicketId:</strong>
                                <br />
                                <span>{user.ticketid}</span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

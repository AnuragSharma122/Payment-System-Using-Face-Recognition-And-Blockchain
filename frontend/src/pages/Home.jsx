import React from "react";

import DangerousHTML from "dangerous-html/react";

import projectStyles from ".style.module.css";
import styles from "./Home.module.css";

export const Home = (props) => {
  return (
    <div className={styles["container"]}>
      <header data-thq="thq-navbar" className={styles["navbar"]}>
        <span className={styles["logo"]}>Character</span>
        <div
          data-thq="thq-navbar-nav"
          data-role="Nav"
          className={styles["desktop-menu"]}
        >
          <nav
            data-thq="thq-navbar-nav-links"
            data-role="Nav"
            className={styles["nav"]}
          >
            <button
              className={` ${styles["button"]} ${projectStyles["button-clean"]} ${projectStyles["button"]} `}
            >
              About
            </button>
            <button
              className={` ${styles["button1"]} ${projectStyles["button-clean"]} ${projectStyles["button"]} `}
            >
              Features
            </button>
            <button
              className={` ${styles["button2"]} ${projectStyles["button-clean"]} ${projectStyles["button"]} `}
            >
              Pricing
            </button>
            <button
              className={` ${styles["button3"]} ${projectStyles["button-clean"]} ${projectStyles["button"]} `}
            >
              Team
            </button>
            <button
              className={` ${styles["button4"]} ${projectStyles["button-clean"]} ${projectStyles["button"]} `}
            >
              Blog
            </button>
          </nav>
        </div>
        <div data-thq="thq-navbar-btn-group" className={styles["btn-group"]}>
          <div className={styles["socials"]}>
            <button
              className={` ${projectStyles["social"]} ${projectStyles["button"]} `}
            >
              <img
                alt="image"
                src="/playground_assets/twitter.svg"
                className={styles["image"]}
              />
            </button>
            <button
              className={` ${projectStyles["social"]} ${projectStyles["button"]} `}
            >
              <img
                alt="image"
                src="/playground_assets/discord.svg"
                className={styles["image01"]}
              />
            </button>
          </div>
          <button className={projectStyles["button"]}>View on Opensea</button>
        </div>
        <div data-thq="thq-burger-menu" className={styles["burger-menu"]}>
          <button
            className={` ${projectStyles["button"]} ${styles["button5"]} `}
          >
            <svg viewBox="0 0 1024 1024" className={styles["icon"]}>
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg>
          </button>
        </div>
        <div data-thq="thq-mobile-menu" className={styles["mobile-menu"]}>
          <div
            data-thq="thq-mobile-menu-nav"
            data-role="Nav"
            className={styles["nav1"]}
          >
            <div className={styles["container1"]}>
              <span className={styles["logo1"]}>Character</span>
              <div data-thq="thq-close-menu" className={styles["menu-close"]}>
                <svg viewBox="0 0 1024 1024" className={styles["icon02"]}>
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <nav
              data-thq="thq-mobile-menu-nav-links"
              data-role="Nav"
              className={styles["nav2"]}
            >
              <span className={styles["text"]}>About</span>
              <span className={styles["text01"]}>Features</span>
              <span className={styles["text02"]}>Pricing</span>
              <span className={styles["text03"]}>Team</span>
              <span className={styles["text04"]}>Blog</span>
            </nav>
            <div className={styles["container2"]}>
              <button
                className={` ${styles["login"]} ${projectStyles["button"]} `}
              >
                Login
              </button>
              <button className={projectStyles["button"]}>Register</button>
            </div>
          </div>
          <div className={styles["icon-group"]}>
            <svg
              viewBox="0 0 950.8571428571428 1024"
              className={styles["icon04"]}
            >
              <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
            </svg>
            <svg
              viewBox="0 0 877.7142857142857 1024"
              className={styles["icon06"]}
            >
              <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
            </svg>
            <svg
              viewBox="0 0 602.2582857142856 1024"
              className={styles["icon08"]}
            >
              <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
            </svg>
          </div>
        </div>
      </header>
      <section className={styles["hero"]}>
        <div className={styles["heading"]}>
          <h1 className={styles["header"]}>
            Create yourself for the metaverse
          </h1>
          <p className={styles["caption"]}>
            A character custom collection is joining the NFT space on Opensea.
          </p>
        </div>
        <div className={styles["buttons"]}>
          <button className={projectStyles["button"]}>View on Opensea</button>
          <button
            className={` ${styles["learn"]} ${projectStyles["button-clean"]} ${projectStyles["button"]} `}
          >
            Learn more
          </button>
        </div>
      </section>
      <section className={styles["description"]}>
        <img
          alt="image"
          src="/playground_assets/hero-divider-1500w.png"
          className={styles["divider-image"]}
        />
        <div className={styles["container3"]}>
          <div className={styles["description01"]}>
            <div className={styles["content"]}>
              <p className={styles["paragraph"]}>
                We are a team of digital aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat.
              </p>
              <p className={styles["paragraph1"]}>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. Nemo enim ipsam
                voluptatem quia voluptas sit aspernatur aut odit aut fugit.
              </p>
            </div>
            <div className={styles["links"]}>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer noopener"
                className={` ${projectStyles["button-link"]} ${projectStyles["button"]} `}
              >
                <span>Follow us on Twitter</span>
                <img
                  alt="image"
                  src="/playground_assets/arrow.svg"
                  className={styles["arrow"]}
                />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer noopener"
                className={` ${styles["link01"]} ${projectStyles["button-link"]} ${projectStyles["button"]} `}
              >
                <span>Join us on Discord</span>
                <img
                  alt="image"
                  src="/playground_assets/arrow.svg"
                  className={styles["arrow1"]}
                />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className={styles["cards"]}>
        <div className={styles["row"]}>
          <div className={styles["card"]}>
            <div className={styles["avatar"]}>
              <img
                alt="image"
                src="/playground_assets/avatar.svg"
                className={styles["avatar1"]}
              />
            </div>
            <div className={styles["main"]}>
              <div className={styles["content01"]}>
                <h2 className={styles["header01"]}>
                  10,000+ unique characters
                </h2>
                <p className={styles["description02"]}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliquat
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi
                </p>
              </div>
              <button
                className={` ${styles["learn1"]} ${projectStyles["button"]} `}
              >
                <span className={styles["text07"]}>Learn more</span>
                <img
                  alt="image"
                  src="/playground_assets/arrow.svg"
                  className={styles["image02"]}
                />
              </button>
            </div>
          </div>
          <div className={styles["card01"]}>
            <div className={styles["avatar2"]}>
              <img
                alt="image"
                src="/playground_assets/default-avatar.svg"
                className={styles["avatar3"]}
              />
            </div>
            <div className={styles["main1"]}>
              <div className={styles["content02"]}>
                <h2 className={styles["header02"]}>
                  Create yourself for the metaverse
                </h2>
                <p className={styles["description03"]}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliquat
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi
                </p>
              </div>
              <button
                className={` ${styles["learn2"]} ${projectStyles["button"]} `}
              >
                <span className={styles["text08"]}>Learn more</span>
                <img
                  alt="image"
                  src="/playground_assets/arrow-2.svg"
                  className={styles["image03"]}
                />
              </button>
            </div>
          </div>
        </div>
        <div className={styles["card02"]}>
          <div className={styles["avatar4"]}>
            <img
              alt="image"
              src="/playground_assets/light-avatar.svg"
              className={styles["avatar5"]}
            />
          </div>
          <div className={styles["row1"]}>
            <div className={styles["main2"]}>
              <div className={styles["content03"]}>
                <h2 className={styles["header03"]}>
                  Create yourself for the metaverse
                </h2>
                <p className={styles["description04"]}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliquat
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi
                </p>
              </div>
              <button
                className={` ${styles["learn3"]} ${projectStyles["button"]} `}
              >
                <span className={styles["text09"]}>Learn more</span>
                <img
                  alt="image"
                  src="/playground_assets/arrow-2.svg"
                  className={styles["image04"]}
                />
              </button>
            </div>
            <img
              alt="image"
              src="/playground_assets/group%202262.svg"
              className={styles["image05"]}
            />
          </div>
        </div>
      </section>
      <section className={styles["collection"]}>
        <div className={styles["content04"]}>
          <span className={styles["caption01"]}>collection</span>
          <div className={styles["heading01"]}>
            <h2 className={styles["header04"]}>All time best collections</h2>
            <p className={styles["header05"]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>
        </div>
        <div className={styles["main3"]}>
          <div className={styles["card03"]}>
            <div className={styles["image06"]}>
              <img
                alt="image"
                src="/playground_assets/character-1.svg"
                className={styles["image07"]}
              />
            </div>
            <div className={styles["content05"]}>
              <span className={styles["caption02"]}>Character #1</span>
              <h3 className={styles["title"]}>0.05 ETH</h3>
            </div>
          </div>
          <div className={styles["card04"]}>
            <div className={styles["image08"]}>
              <img
                alt="image"
                src="/playground_assets/character-2.svg"
                className={styles["image09"]}
              />
            </div>
            <div className={styles["content06"]}>
              <span className={styles["caption03"]}>Character #2</span>
              <h3 className={styles["title1"]}>0.05 ETH</h3>
            </div>
          </div>
          <div className={styles["card05"]}>
            <div className={styles["image10"]}>
              <img
                alt="image"
                src="/playground_assets/character-3.svg"
                className={styles["image11"]}
              />
            </div>
            <div className={styles["content07"]}>
              <span className={styles["caption04"]}>Character #3</span>
              <h3 className={styles["title2"]}>0.05 ETH</h3>
            </div>
          </div>
          <div className={styles["card06"]}>
            <div className={styles["image12"]}>
              <img
                alt="image"
                src="/playground_assets/character-4.svg"
                className={styles["image13"]}
              />
            </div>
            <div className={styles["content08"]}>
              <span className={styles["caption05"]}>
                <span>Character #4</span>
                <br></br>
              </span>
              <h3 className={styles["title3"]}>0.05 ETH</h3>
            </div>
          </div>
          <div className={styles["card07"]}>
            <div className={styles["image14"]}>
              <img
                alt="image"
                src="/playground_assets/character-5.svg"
                className={styles["image15"]}
              />
            </div>
            <div className={styles["content09"]}>
              <span className={styles["caption06"]}>Character #5</span>
              <h3 className={styles["title4"]}>0.05 ETH</h3>
            </div>
          </div>
          <div className={styles["card08"]}>
            <div className={styles["image16"]}>
              <img
                alt="image"
                src="/playground_assets/character-6.svg"
                className={styles["image17"]}
              />
            </div>
            <div className={styles["content10"]}>
              <span className={styles["caption07"]}>Character #6</span>
              <h3 className={styles["title5"]}>0.05 ETH</h3>
            </div>
          </div>
          <div className={styles["card09"]}>
            <div className={styles["image18"]}>
              <img
                alt="image"
                src="/playground_assets/character-7.svg"
                className={styles["image19"]}
              />
            </div>
            <div className={styles["content11"]}>
              <span className={styles["caption08"]}>Character #7</span>
              <h3 className={styles["title6"]}>0.05 ETH</h3>
            </div>
          </div>
          <div className={styles["card10"]}>
            <div className={styles["image20"]}>
              <img
                alt="image"
                src="/playground_assets/character-8.svg"
                className={styles["image21"]}
              />
            </div>
            <div className={styles["content12"]}>
              <span className={styles["caption09"]}>Character #8</span>
              <h3 className={styles["title7"]}>0.05 ETH</h3>
            </div>
          </div>
        </div>
        <button
          className={` ${styles["view2"]} ${projectStyles["button-link"]} ${projectStyles["button"]} `}
        >
          View all
        </button>
      </section>
      <section className={styles["project"]}>
        <div className={styles["understand"]}>
          <div className={styles["content13"]}>
            <span className={styles["caption10"]}>Project</span>
            <div className={styles["heading02"]}>
              <h2 className={styles["header06"]}>Understand the project</h2>
              <p className={styles["header07"]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <button
              className={` ${styles["view3"]} ${projectStyles["button-link"]} ${projectStyles["button"]} `}
            >
              <span>Learn More</span>
              <img
                alt="image"
                src="/playground_assets/arrow.svg"
                className={styles["image22"]}
              />
            </button>
          </div>
          <img
            alt="image"
            src="/playground_assets/group%202415.svg"
            className={styles["image23"]}
          />
        </div>
        <div className={styles["mining"]}>
          <img
            alt="image"
            src="/playground_assets/group%202422.svg"
            className={styles["image24"]}
          />
          <div className={styles["content14"]}>
            <span className={styles["caption11"]}>Project</span>
            <div className={styles["heading03"]}>
              <h2 className={styles["header08"]}>How the minting works</h2>
              <p className={styles["header09"]}>
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </span>
                <br></br>
                <br></br>
                <span>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.
                </span>
                <br></br>
              </p>
            </div>
            <button
              className={` ${styles["view4"]} ${projectStyles["button-link"]} ${projectStyles["button"]} `}
            >
              <span>Learn More</span>
              <img
                alt="image"
                src="/playground_assets/arrow.svg"
                className={styles["image25"]}
              />
            </button>
          </div>
        </div>
      </section>
      <section className={styles["roadmap"]}>
        <div className={styles["heading04"]}>
          <h2 className={styles["header10"]}>Roadmap</h2>
          <p className={styles["header11"]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </p>
        </div>
        <div className={styles["list"]}>
          <div className={styles["step"]}>
            <span className={styles["caption12"]}>01</span>
            <div className={styles["heading05"]}>
              <h2 className={styles["header12"]}>Project Launch</h2>
              <p className={styles["header13"]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <button
              className={` ${styles["button6"]} ${projectStyles["button"]} `}
            >
              View on Opensea
            </button>
          </div>
          <div className={styles["step1"]}>
            <span className={styles["caption13"]}>02</span>
            <div className={styles["heading06"]}>
              <h2 className={styles["header14"]}>Metadata and Character</h2>
              <p className={styles["header15"]}>
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <br></br>
                <br></br>
                <span>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </span>
                <br></br>
              </p>
            </div>
          </div>
          <div className={styles["step2"]}>
            <span className={styles["caption14"]}>03</span>
            <div className={styles["heading07"]}>
              <h2 className={styles["header16"]}>Get Physical</h2>
              <p className={styles["header17"]}>
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <br></br>
                <br></br>
                <span>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </span>
                <br></br>
              </p>
            </div>
          </div>
          <div className={styles["step3"]}>
            <span className={styles["caption15"]}>04</span>
            <div className={styles["heading08"]}>
              <h2 className={styles["header18"]}>Private club community</h2>
              <p className={styles["header19"]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                <span
                  dangerouslySetInnerHTML={{
                    __html: " ",
                  }}
                />
              </p>
              <div className={styles["benefits"]}>
                <div className={styles["item"]}>
                  <img
                    alt="image"
                    src="/playground_assets/people.svg"
                    className={styles["image26"]}
                  />
                  <p className={styles["header20"]}>
                    Consectetur adipiscing elit
                  </p>
                </div>
                <div className={styles["item1"]}>
                  <img
                    alt="image"
                    src="/playground_assets/paper.svg"
                    className={styles["image27"]}
                  />
                  <p className={styles["header21"]}>
                    Consectetur adipiscing elit
                  </p>
                </div>
                <div className={styles["item2"]}>
                  <img
                    alt="image"
                    src="/playground_assets/checklist.svg"
                    className={styles["image28"]}
                  />
                  <p className={styles["header22"]}>
                    Consectetur adipiscing elit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles["join-us"]}>
        <div className={styles["content15"]}>
          <div className={styles["main4"]}>
            <div className={styles["heading09"]}>
              <h2 className={styles["header23"]}>Create your character now</h2>
              <p className={styles["caption16"]}>
                A character custom collection is joining the NFT space on
                Opensea.
              </p>
            </div>
            <button
              className={` ${styles["view5"]} ${projectStyles["button"]} `}
            >
              View on Opensea
            </button>
          </div>
          <img
            alt="image"
            src="/playground_assets/group%202273.svg"
            className={styles["image29"]}
          />
        </div>
      </section>
      <section className={styles["faq"]}>
        <h2 className={styles["header24"]}>We have all the answers</h2>
        <div className={styles["accordion"]}>
          <div
            data-role="accordion-container"
            className={` ${styles["element"]} ${projectStyles["accordion"]} `}
          >
            <div className={styles["content16"]}>
              <span className={styles["header25"]}>
                Lorem ipsum dolor sit ametetur elit?
              </span>
              <span
                data-role="accordion-content"
                className={styles["description05"]}
              >
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
                <span
                  dangerouslySetInnerHTML={{
                    __html: " ",
                  }}
                />
              </span>
            </div>
            <div className={styles["icon-container"]}>
              <svg
                viewBox="0 0 1024 1024"
                data-role="accordion-icon-closed"
                className={styles["icon10"]}
              >
                <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
              <svg
                viewBox="0 0 1024 1024"
                data-role="accordion-icon-open"
                className={styles["icon12"]}
              >
                <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
            </div>
          </div>
          <div
            data-role="accordion-container"
            className={` ${styles["element1"]} ${projectStyles["accordion"]} `}
          >
            <div className={styles["content17"]}>
              <span className={styles["header26"]}>
                Excepteur sint occaecat cupidatat non sunt in culpa qui officia
                deserunt mollit anim id est laborum?
              </span>
              <span
                data-role="accordion-content"
                className={styles["description06"]}
              >
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
                <span
                  dangerouslySetInnerHTML={{
                    __html: " ",
                  }}
                />
              </span>
            </div>
            <div className={styles["icon-container1"]}>
              <svg
                viewBox="0 0 1024 1024"
                data-role="accordion-icon-closed"
                className={styles["icon14"]}
              >
                <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
              <svg
                viewBox="0 0 1024 1024"
                data-role="accordion-icon-open"
                className={styles["icon16"]}
              >
                <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
            </div>
          </div>
          <div
            data-role="accordion-container"
            className={` ${styles["element2"]} ${projectStyles["accordion"]} `}
          >
            <div className={styles["content18"]}>
              <span className={styles["header27"]}>
                Tempor incididunt ut labore et dolore magna aliquat enim ad
                minim?
              </span>
              <span
                data-role="accordion-content"
                className={styles["description07"]}
              >
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
                <span
                  dangerouslySetInnerHTML={{
                    __html: " ",
                  }}
                />
              </span>
            </div>
            <div className={styles["icon-container2"]}>
              <svg
                viewBox="0 0 1024 1024"
                data-role="accordion-icon-closed"
                className={styles["icon18"]}
              >
                <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
              <svg
                viewBox="0 0 1024 1024"
                data-role="accordion-icon-open"
                className={styles["icon20"]}
              >
                <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
            </div>
          </div>
          <div
            data-role="accordion-container"
            className={` ${styles["element3"]} ${projectStyles["accordion"]} `}
          >
            <div className={styles["content19"]}>
              <span className={styles["header28"]}>
                Lorem ipsum dolor sit ametetur elit?
              </span>
              <span
                data-role="accordion-content"
                className={styles["description08"]}
              >
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
                <span
                  dangerouslySetInnerHTML={{
                    __html: " ",
                  }}
                />
              </span>
            </div>
            <div className={styles["icon-container3"]}>
              <svg
                viewBox="0 0 1024 1024"
                data-role="accordion-icon-closed"
                className={styles["icon22"]}
              >
                <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
              <svg
                viewBox="0 0 1024 1024"
                data-role="accordion-icon-open"
                className={styles["icon24"]}
              >
                <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
            </div>
          </div>
          <div
            data-role="accordion-container"
            className={` ${styles["element4"]} ${projectStyles["accordion"]} `}
          >
            <div className={styles["content20"]}>
              <span className={styles["header29"]}>
                Incididunt ut labore et dolore?
              </span>
              <span
                data-role="accordion-content"
                className={styles["description09"]}
              >
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
                <span
                  dangerouslySetInnerHTML={{
                    __html: " ",
                  }}
                />
              </span>
            </div>
            <div className={styles["icon-container4"]}>
              <svg
                viewBox="0 0 1024 1024"
                data-role="accordion-icon-closed"
                className={styles["icon26"]}
              >
                <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
              <svg
                viewBox="0 0 1024 1024"
                data-role="accordion-icon-open"
                className={styles["icon28"]}
              >
                <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>
      <section className={styles["get-yours"]}>
        <div className={styles["row2"]}>
          <div className={styles["column"]}>
            <div className={styles["card11"]}>
              <img
                alt="image"
                src="/playground_assets/character-9.svg"
                className={styles["image30"]}
              />
            </div>
          </div>
          <div className={styles["column1"]}>
            <div className={styles["card12"]}>
              <img
                alt="image"
                src="/playground_assets/character-10.svg"
                className={styles["image31"]}
              />
            </div>
          </div>
        </div>
        <div className={styles["column2"]}>
          <div className={styles["card13"]}>
            <div className={styles["content21"]}>
              <h2 className={styles["header30"]}>Get yours now</h2>
              <p className={styles["description10"]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliquat enim
                ad minim veniam.
              </p>
            </div>
            <button
              className={` ${styles["button7"]} ${projectStyles["button"]} `}
            >
              View on Opensea
            </button>
          </div>
        </div>
      </section>
      <footer className={styles["footer"]}>
        <div className={styles["main5"]}>
          <div className={styles["branding"]}>
            <div className={styles["heading10"]}>
              <h2 className={styles["logo2"]}>Character</h2>
              <p className={styles["caption17"]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore.
              </p>
            </div>
            <div className={styles["socials1"]}>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer noopener"
                className={` ${styles["twitter1"]} ${projectStyles["social"]} ${projectStyles["button"]} `}
              >
                <img
                  alt="image"
                  src="/playground_assets/twitter.svg"
                  className={styles["image32"]}
                />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer noopener"
                className={` ${styles["discord1"]} ${projectStyles["social"]} ${projectStyles["button"]} `}
              >
                <img
                  alt="image"
                  src="/playground_assets/discord.svg"
                  className={styles["image33"]}
                />
              </a>
            </div>
          </div>
          <div className={styles["links1"]}>
            <div className={styles["list1"]}>
              <h3 className={styles["heading11"]}>Site</h3>
              <div className={styles["items"]}>
                <button
                  className={` ${styles["link02"]} ${projectStyles["button-clean"]} ${projectStyles["button"]} `}
                >
                  About
                </button>
                <button
                  className={` ${styles["link03"]} ${projectStyles["button-clean"]} ${projectStyles["button"]} `}
                >
                  Collection
                </button>
                <button
                  className={` ${styles["link04"]} ${projectStyles["button-clean"]} ${projectStyles["button"]} `}
                >
                  Roadmap
                </button>
                <button
                  className={` ${styles["link05"]} ${projectStyles["button-clean"]} ${projectStyles["button"]} `}
                >
                  Features
                </button>
              </div>
            </div>
            <div className={styles["list2"]}>
              <h3 className={styles["heading12"]}>Company</h3>
              <div className={styles["items1"]}>
                <button
                  className={` ${styles["link06"]} ${projectStyles["button-clean"]} ${projectStyles["button"]} `}
                >
                  Team
                </button>
                <button
                  className={` ${styles["link07"]} ${projectStyles["button-clean"]} ${projectStyles["button"]} `}
                >
                  Press
                </button>
                <button
                  className={` ${styles["link08"]} ${projectStyles["button-clean"]} ${projectStyles["button"]} `}
                >
                  Terms
                </button>
                <button
                  className={` ${styles["link09"]} ${projectStyles["button-clean"]} ${projectStyles["button"]} `}
                >
                  Limitations
                </button>
                <button
                  className={` ${styles["link10"]} ${projectStyles["button-clean"]} ${projectStyles["button"]} `}
                >
                  Licenses
                </button>
              </div>
            </div>
          </div>
          <div className={styles["socials2"]}>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer noopener"
              className={` ${styles["twitter2"]} ${projectStyles["social"]} ${projectStyles["button"]} `}
            >
              <img
                alt="image"
                src="/playground_assets/twitter.svg"
                className={styles["image34"]}
              />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer noopener"
              className={` ${styles["discord2"]} ${projectStyles["social"]} ${projectStyles["button"]} `}
            >
              <img
                alt="image"
                src="/playground_assets/discord.svg"
                className={styles["image35"]}
              />
            </a>
          </div>
        </div>
        <span className={styles["copyright"]}>
          © 2022 Character. All Rights Reserved.
        </span>
      </footer>
      <div>
        <DangerousHTML
          html={`<script>
 /*
  Accordion - Code Embed
  */
  const accordionContainers = document.querySelectorAll('[data-role="accordion-container"]'); // All accordion containers
  const accordionContents = document.querySelectorAll('[data-role="accordion-content"]'); // All accordion content
  const accordionIconsClosed = document.querySelectorAll('[data-role="accordion-icon-closed"]'); // All accordion closed icons
  const accordionIconsOpen = document.querySelectorAll('[data-role="accordion-icon-open"]'); // All accordion open icons

  accordionContents.forEach((accordionContent) => {
      accordionContent.style.display = "none"; //Hides all accordion contents
  });

  accordionIconsClosed.forEach((icon) => {
    icon.style.display = "flex"
  })

  accordionIconsOpen.forEach((icon) => {
    icon.style.display = "none"
  })

  accordionContainers.forEach((accordionContainer, index) => {
      accordionContainer.addEventListener("click", () => {
          if (accordionContents[index].style.display === "flex") {
              // If the accordion is already open, close it
              accordionContents[index].style.display = "none";
              accordionIconsClosed[index].style.display = "flex";
              accordionIconsOpen[index].style.display = "none"
          } else {
              // If the accordion is closed, open it
              accordionContents.forEach((accordionContent) => {
                  accordionContent.style.display = "none"; //Hides all accordion contents
              });

              accordionIconsClosed.forEach((accordionIcon) => {
                  accordionIcon.style.display = "flex"; // Resets all icon transforms to 0deg (default)
              });

              accordionIconsOpen.forEach((accordionIcon) => {
                accordionIcon.style.display = "none";
              })
              
              accordionContents[index].style.display = "flex"; // Shows accordion content
              accordionIconsClosed[index].style.display = "none"; // Rotates accordion icon 180deg
              accordionIconsOpen[index].style.display = "flex";
          }
      });
  });
</script>
`}
        ></DangerousHTML>
      </div>
    </div>
  );
};

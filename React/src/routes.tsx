import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { HomePage } from './pages/HomePage';
import { PortfolioStockPage } from './pages/PortfolioStockPage';
import { StockPage } from './pages/StockPage';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/stock/:id" component={StockPage}/>
        <Route exact path="/portfolio" component={PortfolioStockPage}/>
      </Switch>
    </BrowserRouter>
  );
}
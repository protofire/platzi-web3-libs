import { VotingGateway } from './../../domain/gateways/voting_gateway';
import Web3 from 'web3';

export class Web3Gateway implements VotingGateway{

    makeVote(vote: boolean): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
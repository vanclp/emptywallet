package main

import (
	"context"
	"errors"
	"fmt"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/expression"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

type Transaction struct {
	Id       string `dynamodbav:"id"`
	Username string `dynamodbav:"username"`
	Amount   string `dynamodbav:"amount"`
}

type TransactionRepository struct {
	db *dynamodb.Client
}

func (t *TransactionRepository) Create(transaction Transaction) error {
	//condition for existing name attribute
	nameNotExist := expression.AttributeNotExists(expression.Name("username"))
	builder := expression.NewBuilder().WithCondition(nameNotExist)
	exp, _ := builder.Build()

	item, _ := attributevalue.MarshalMap(transaction)

	input := &dynamodb.PutItemInput{
		TableName:                aws.String("transaction"),
		ConditionExpression:      exp.Condition(), // fail if username already exist
		ExpressionAttributeNames: exp.Names(),
		Item:                     item,
	}

	_, err := t.db.PutItem(context.TODO(), input)

	if err != nil {
		fmt.Println("Transaction: cannot save transaction")
		return errors.New("Create: could not create transaction")
	}

	return nil
}
